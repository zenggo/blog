---
title: React Hooks
date: 2021-03-26 16:00:00 +0000

---
Hooks是render props (RP)和higher order compoent (HOC)的进化版。

写一个组件通常包括逻辑和视图两部分代码，在老式的react写法(React.Compoent)中，视图集中在render，逻辑则散布在constructor(states)和生命周期方法中。复用视图很简单，只要把视图部分抽成一个无状态的纯函数组件即可，而复用逻辑在老式的写法中需要靠绕弯子实现，比如RP和HOC。RP和HOC通常只包含逻辑，将逻辑结果以属性/参数的方式注入被wrap的视图组件，实现同一逻辑被多个视图组件复用。

  
但RP和HOC有两点缺陷：

1. 书写不够自然，RP和HOC都要包裹一层，且逻辑复用以JSX的形式出现（带有RP的纯逻辑组件被写成JSX）
2. 如果要复用n个独立逻辑，则需要包裹n层，且每层的HOC或RP组件都要透传上一层的props，形成nesting hell

于是，hooks出现了。就逻辑复用而言，hooks简洁的函数式写法取代了略显厚重的HOC与RP，不存在嵌套地域和透传，带来即插即用的体验。Hooks不仅是茴字的新写法，也改变了开发思维和生态：尽可能地区分逻辑与视图，抽出可复用的逻辑，封装成hooks；与视图组件一样，hooks被广泛地封装与分享。