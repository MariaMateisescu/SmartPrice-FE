import { ak as h, bt as createComponent, cl as useSpinnerProps, cm as useSpinner } from "./index.0ce84b9b.js";
const svg = [
  h("g", {
    transform: "translate(1 1)",
    "stroke-width": "2",
    fill: "none",
    "fill-rule": "evenodd"
  }, [
    h("circle", {
      "stroke-opacity": ".5",
      cx: "18",
      cy: "18",
      r: "18"
    }),
    h("path", {
      d: "M36 18c0-9.94-8.06-18-18-18"
    }, [
      h("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        from: "0 18 18",
        to: "360 18 18",
        dur: "1s",
        repeatCount: "indefinite"
      })
    ])
  ])
];
var QSpinnerOval = createComponent({
  name: "QSpinnerOval",
  props: useSpinnerProps,
  setup(props) {
    const { cSize, classes } = useSpinner(props);
    return () => h("svg", {
      class: classes.value,
      stroke: "currentColor",
      width: cSize.value,
      height: cSize.value,
      viewBox: "0 0 38 38",
      xmlns: "http://www.w3.org/2000/svg"
    }, svg);
  }
});
export { QSpinnerOval as Q };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVNwaW5uZXJPdmFsLjAwMzE3N2UyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3NwaW5uZXIvUVNwaW5uZXJPdmFsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGggfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VTcGlubmVyLCB7IHVzZVNwaW5uZXJQcm9wcyB9IGZyb20gJy4vdXNlLXNwaW5uZXIuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuXG5jb25zdCBzdmcgPSBbXG4gIGgoJ2cnLCB7XG4gICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKDEgMSknLFxuICAgICdzdHJva2Utd2lkdGgnOiAnMicsXG4gICAgZmlsbDogJ25vbmUnLFxuICAgICdmaWxsLXJ1bGUnOiAnZXZlbm9kZCdcbiAgfSwgW1xuICAgIGgoJ2NpcmNsZScsIHtcbiAgICAgICdzdHJva2Utb3BhY2l0eSc6ICcuNScsXG4gICAgICBjeDogJzE4JyxcbiAgICAgIGN5OiAnMTgnLFxuICAgICAgcjogJzE4J1xuICAgIH0pLFxuICAgIGgoJ3BhdGgnLCB7XG4gICAgICBkOiAnTTM2IDE4YzAtOS45NC04LjA2LTE4LTE4LTE4J1xuICAgIH0sIFtcbiAgICAgIGgoJ2FuaW1hdGVUcmFuc2Zvcm0nLCB7XG4gICAgICAgIGF0dHJpYnV0ZU5hbWU6ICd0cmFuc2Zvcm0nLFxuICAgICAgICB0eXBlOiAncm90YXRlJyxcbiAgICAgICAgZnJvbTogJzAgMTggMTgnLFxuICAgICAgICB0bzogJzM2MCAxOCAxOCcsXG4gICAgICAgIGR1cjogJzFzJyxcbiAgICAgICAgcmVwZWF0Q291bnQ6ICdpbmRlZmluaXRlJ1xuICAgICAgfSlcbiAgICBdKVxuICBdKVxuXVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVNwaW5uZXJPdmFsJyxcblxuICBwcm9wczogdXNlU3Bpbm5lclByb3BzLFxuXG4gIHNldHVwIChwcm9wcykge1xuICAgIGNvbnN0IHsgY1NpemUsIGNsYXNzZXMgfSA9IHVzZVNwaW5uZXIocHJvcHMpXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnc3ZnJywge1xuICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICBzdHJva2U6ICdjdXJyZW50Q29sb3InLFxuICAgICAgd2lkdGg6IGNTaXplLnZhbHVlLFxuICAgICAgaGVpZ2h0OiBjU2l6ZS52YWx1ZSxcbiAgICAgIHZpZXdCb3g6ICcwIDAgMzggMzgnLFxuICAgICAgeG1sbnM6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZydcbiAgICB9LCBzdmcpXG4gIH1cbn0pXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE1BQU0sTUFBTTtBQUFBLEVBQ1YsRUFBRSxLQUFLO0FBQUEsSUFDTCxXQUFXO0FBQUEsSUFDWCxnQkFBZ0I7QUFBQSxJQUNoQixNQUFNO0FBQUEsSUFDTixhQUFhO0FBQUEsRUFDakIsR0FBSztBQUFBLElBQ0QsRUFBRSxVQUFVO0FBQUEsTUFDVixrQkFBa0I7QUFBQSxNQUNsQixJQUFJO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixHQUFHO0FBQUEsSUFDVCxDQUFLO0FBQUEsSUFDRCxFQUFFLFFBQVE7QUFBQSxNQUNSLEdBQUc7QUFBQSxJQUNULEdBQU87QUFBQSxNQUNELEVBQUUsb0JBQW9CO0FBQUEsUUFDcEIsZUFBZTtBQUFBLFFBQ2YsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sSUFBSTtBQUFBLFFBQ0osS0FBSztBQUFBLFFBQ0wsYUFBYTtBQUFBLE1BQ3JCLENBQU87QUFBQSxJQUNQLENBQUs7QUFBQSxFQUNMLENBQUc7QUFDSDtBQUVBLElBQUEsZUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsRUFFUCxNQUFPLE9BQU87QUFDWixVQUFNLEVBQUUsT0FBTyxZQUFZLFdBQVcsS0FBSztBQUUzQyxXQUFPLE1BQU0sRUFBRSxPQUFPO0FBQUEsTUFDcEIsT0FBTyxRQUFRO0FBQUEsTUFDZixRQUFRO0FBQUEsTUFDUixPQUFPLE1BQU07QUFBQSxNQUNiLFFBQVEsTUFBTTtBQUFBLE1BQ2QsU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLElBQ1IsR0FBRSxHQUFHO0FBQUEsRUFDUDtBQUNILENBQUM7OyJ9
