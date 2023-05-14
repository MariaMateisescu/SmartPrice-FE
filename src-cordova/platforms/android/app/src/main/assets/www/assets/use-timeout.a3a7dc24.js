import { ax as onDeactivated, av as onBeforeUnmount, as as nextTick, c1 as vmIsDestroyed, ah as getCurrentInstance } from "./index.5a14f3c4.js";
function useTick() {
  let tickFn;
  const vm = getCurrentInstance();
  function removeTick() {
    tickFn = void 0;
  }
  onDeactivated(removeTick);
  onBeforeUnmount(removeTick);
  return {
    removeTick,
    registerTick(fn) {
      tickFn = fn;
      nextTick(() => {
        if (tickFn === fn) {
          vmIsDestroyed(vm) === false && tickFn();
          tickFn = void 0;
        }
      });
    }
  };
}
function useTimeout() {
  let timer = null;
  const vm = getCurrentInstance();
  function removeTimeout() {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }
  onDeactivated(removeTimeout);
  onBeforeUnmount(removeTimeout);
  return {
    removeTimeout,
    registerTimeout(fn, delay) {
      removeTimeout();
      if (vmIsDestroyed(vm) === false) {
        timer = setTimeout(fn, delay);
      }
    }
  };
}
export { useTimeout as a, useTick as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLXRpbWVvdXQuYTNhN2RjMjQuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXRpY2suanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS10aW1lb3V0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG5leHRUaWNrLCBvbkRlYWN0aXZhdGVkLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgdm1Jc0Rlc3Ryb3llZCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvdm0nXG5cbi8qXG4gKiBVc2FnZTpcbiAqICAgIHJlZ2lzdGVyVGljayhmbilcbiAqICAgIHJlbW92ZVRpY2soKVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgbGV0IHRpY2tGblxuICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgZnVuY3Rpb24gcmVtb3ZlVGljayAoKSB7XG4gICAgdGlja0ZuID0gdm9pZCAwXG4gIH1cblxuICBvbkRlYWN0aXZhdGVkKHJlbW92ZVRpY2spXG4gIG9uQmVmb3JlVW5tb3VudChyZW1vdmVUaWNrKVxuXG4gIHJldHVybiB7XG4gICAgcmVtb3ZlVGljayxcblxuICAgIHJlZ2lzdGVyVGljayAoZm4pIHtcbiAgICAgIHRpY2tGbiA9IGZuXG5cbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgaWYgKHRpY2tGbiA9PT0gZm4pIHtcbiAgICAgICAgICAvLyB3ZSBhbHNvIGNoZWNrIGlmIFZNIGlzIGRlc3Ryb3llZCwgc2luY2UgaWYgaXRcbiAgICAgICAgICAvLyBnb3QgdG8gdHJpZ2dlciBvbmUgbmV4dFRpY2soKSB3ZSBjYW5ub3Qgc3RvcCBpdFxuICAgICAgICAgIHZtSXNEZXN0cm95ZWQodm0pID09PSBmYWxzZSAmJiB0aWNrRm4oKVxuICAgICAgICAgIHRpY2tGbiA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgb25EZWFjdGl2YXRlZCwgb25CZWZvcmVVbm1vdW50LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHZtSXNEZXN0cm95ZWQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3ZtLmpzJ1xuXG4vKlxuICogVXNhZ2U6XG4gKiAgICByZWdpc3RlclRpbWVvdXQoZm5bLCBkZWxheV0pXG4gKiAgICByZW1vdmVUaW1lb3V0KClcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGxldCB0aW1lciA9IG51bGxcbiAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVRpbWVvdXQgKCkge1xuICAgIGlmICh0aW1lciAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgdGltZXIgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgb25EZWFjdGl2YXRlZChyZW1vdmVUaW1lb3V0KVxuICBvbkJlZm9yZVVubW91bnQocmVtb3ZlVGltZW91dClcblxuICByZXR1cm4ge1xuICAgIHJlbW92ZVRpbWVvdXQsXG5cbiAgICByZWdpc3RlclRpbWVvdXQgKGZuLCBkZWxheSkge1xuICAgICAgcmVtb3ZlVGltZW91dCh0aW1lcilcblxuICAgICAgaWYgKHZtSXNEZXN0cm95ZWQodm0pID09PSBmYWxzZSkge1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoZm4sIGRlbGF5KVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFVZSxTQUFBLFVBQVk7QUFDekIsTUFBSTtBQUNKLFFBQU0sS0FBSyxtQkFBb0I7QUFFL0IsV0FBUyxhQUFjO0FBQ3JCLGFBQVM7QUFBQSxFQUNWO0FBRUQsZ0JBQWMsVUFBVTtBQUN4QixrQkFBZ0IsVUFBVTtBQUUxQixTQUFPO0FBQUEsSUFDTDtBQUFBLElBRUEsYUFBYyxJQUFJO0FBQ2hCLGVBQVM7QUFFVCxlQUFTLE1BQU07QUFDYixZQUFJLFdBQVcsSUFBSTtBQUdqQix3QkFBYyxFQUFFLE1BQU0sU0FBUyxPQUFRO0FBQ3ZDLG1CQUFTO0FBQUEsUUFDVjtBQUFBLE1BQ1QsQ0FBTztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0g7QUMzQmUsU0FBQSxhQUFZO0FBQ3pCLE1BQUksUUFBUTtBQUNaLFFBQU0sS0FBSyxtQkFBb0I7QUFFL0IsV0FBUyxnQkFBaUI7QUFDeEIsUUFBSSxVQUFVLE1BQU07QUFDbEIsbUJBQWEsS0FBSztBQUNsQixjQUFRO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFFRCxnQkFBYyxhQUFhO0FBQzNCLGtCQUFnQixhQUFhO0FBRTdCLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFFQSxnQkFBaUIsSUFBSSxPQUFPO0FBQzFCLG9CQUFtQjtBQUVuQixVQUFJLGNBQWMsRUFBRSxNQUFNLE9BQU87QUFDL0IsZ0JBQVEsV0FBVyxJQUFJLEtBQUs7QUFBQSxNQUM3QjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0g7OyJ9
