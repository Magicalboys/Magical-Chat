/**
 * 一个将 items 往下推到正确位置的空元素
 */
 import { ReactElement, useEffect, useState } from "react";
 import "./index.css";
import React from "react";
 
 export default function Srcoll() {
   // children 语义不好，赋值给 Component
   let containerHeight = 500,itemHeight = 20,itemCount = 1000;
 
   let Component = ({ key, style, children }) => {
     // ...函数组件的实现
     return (
       <div key={key} style={style} className="item">
         {children}
       </div>
     );
   };
 
   const contentHeight = itemHeight * itemCount; // 内容总高度
   const [scrollTop, setScrollTop] = useState(0); // 滚动位置 // 继续需要渲染的 item 索引有哪些
   let startIdx = Math.floor(scrollTop / itemHeight);
   let endIdx = Math.floor((scrollTop + containerHeight) / itemHeight); // 上下额外多渲染几个 item，解决滚动时来不及加载元素出现短暂的空白区域的问题
 
   const paddingCount = 2;
   startIdx = Math.max(startIdx - paddingCount, 0); // 处理越界情况
   endIdx = Math.min(endIdx + paddingCount, itemCount - 1);
 
   const top = itemHeight * startIdx; // 第一个渲染的 item 到顶部距离 // 需要渲染的 items
 
   const items = [];
 
   useEffect(()=>{
    for (let i = startIdx; i <= endIdx; i++) {
      items.push(
        <Component key={i} style={{ height: itemHeight }}>
          {i}
        </Component>
      );
    }
   },[])
 
   return (
     <div
       style={{ height: containerHeight, overflow: "auto" }}
       onScroll={(e) => {
         const target = e.target; // 类型断言为HTMLDivElement
         const scrollTop = target.scrollTop;
         setScrollTop(scrollTop);
       }}
     >
       <div style={{ height: contentHeight }}>
         {/* 一个将 items 往下推到正确位置的空元素 */}
         <div style={{ height: top }}></div>
         {items}
       </div>
     </div>
   );
 }
 