---
title: ubuntu上mysql允许远程连接
date: 2019-04-26 13:25:59
---

最近想用docker整理一个linux开发环境，打包需要的软件与配置，在本机起一个docker容器来跑server与mysql进行开发，部署时直接把dockerfile扔到机器上build一下即可。但在本机连接docker里的mysql时碰到了无法访问的问题，开始以为是docker的问题，后来发现与docker无关，就是mysql远程连接的问题。现象原因与解决方法如下：

1. 在容器中mysql已启动，可以在容器终端中进入mysql命令行操作。容器的3306端口映射到宿主机的3307端口。此时我想用宿主机上的db客户端如mysqlworkbench连接容器中的mysql操作(这里为了方便用终端mysql-client来举例子，实际报错一样)
```
$ mysql -uroot -h127.0.0.1 -P3307 // 向本地3307端口发起连接请求，3307对应容器中的3306
```
发现报错：
```
ERROR 2013 (HY000): Lost connection to MySQL server at 'reading initial communication packet', system error: 0
```
2. 检查容器中的端口占用：
```
$ netstat -an | grep 3306
// 输出
tcp6       0      0 127.0.0.1:3306                  :::*                    LISTEN  
```
监听端口正常，但却绑定了本地地址，难怪总是连接不上。于是查了下资料，找到了解决办法：修改mysql的配置文件(不同版本路径可能不同，我的版本是5.7.25-0ubuntu0.18.04.2)，将bind-address后面增加远程访问IP地址或者禁掉这句话。
```
$ vi /etc/mysql/mysql.conf.d/mysqld.cnf

# Instead of skip-networking the default is now to listen only on
# localhost which is more compatible and is not less secure.
# bind-address          = 127.0.0.1
```
```
// 记得重启哦
$ service mysql restart
```
3. 再在宿主机上试一次，发现还是不行：
```
ERROR 1130 (HY000): Host '172.17.0.1' is not allowed to connect to this MySQL server
```
这里`172.17.0.1`是宿主机在容器所处局域网中的ip地址。
在容器mysql中查询：
```
mysql> USE mysql;
mysql> SELECT user, host FROM user;
+------------------+-----------+
| user             | host      |
+------------------+-----------+
| debian-sys-maint | localhost |
| mysql.session    | localhost |
| mysql.sys        | localhost |
| root             | localhost |
+------------------+-----------+
```
也就是说，mysql默认只允许root用户在localhost上登录。解决方法是为root用户添加远程访问的权限（或者新增其他用户，把下面sql中的root改成新的用户名就行了）：
```
mysql> GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '你希望root远程访问时输入的密码';
mysql> reflush privileges;
```
再查一次user表，发现多了一个`root@%`。这行是我们用来远程登录的root账户。注意，`root@localhost`的密码可以与`root@%`不同，远程登录只能用我们刚才`grant ... identified by ...`时输入的密码。
```
mysql> select user,host from user;
+------------------+-----------+
| user             | host      |
+------------------+-----------+
| root             | %         |
| debian-sys-maint | localhost |
| mysql.session    | localhost |
| mysql.sys        | localhost |
| root             | localhost |
+------------------+-----------+
```
最后再试一次远程登录，成功了。

总的来说，要远程连接mysql，需要两个步骤：
1. 使mysql不止绑定localhost；
2. 在mysql中添加可以远程访问的账号并授权（这里用root举例）。