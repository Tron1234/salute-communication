let editorBtns = [{
  parentNode: 'editorFont',
  childNode: [{name:'bold',status:false}, {name:'italic',status:false}, {name:'underline',status:false}, {name:'strikethrough',status:false}, {name:'H1',status:false}, {name:'H2',status:false}, {name:'H3',status:false}, {name:'H4',status:false}]
}, {
  parentNode: 'editorParagraph',
  childNode: [{name:'paragraph-left',status:false}, {name:'paragraph-center',status:false}, {name:'paragraph-right',status:false}, {name:'paragraph-justify',status:false},{name:'indent',status:false}, {name:'separator',status:false}]
}, {
  parentNode: 'list',
  childNode: [{name:'list-ordered',status:false}, {name:'list-bullet',status:false}, {name:'list-check',status:false}]
}, {
  parentNode: 'color'
}, {
  parentNode: 'picture'
}, {
  parentNode: 'undo'
}, {
  parentNode: 'redo'
}]

let editorBtnStyle = [
  [{name:'bold',value:'strong'}, {name:'italic',value:'em'}, {name:'underline',value:true}, {name:'strike',value:'del'}, {name:'header',value:'1'}, {name:'header',value:'2'}, {name:'header',value:'3'}, {name:'header',value:'4'}],
  [{name:'align',value:'left'},{name:'align',value:'center'},{name:'align',value:'right'},{name:'align',value:'justify'},{name:'textIndent',value:'2em'}],
  [{name:'list',value:'ordered'},{name:'list',value:'bullet'},{name:'list',value:'unchecked'}]
]
let fontColor=[{color:'#D32F2F',status:false},{color:'#D81B60',status:false},{color:'#8E24AA',status:false},{color:'#3949AB',status:false},{color:'#1E88E5',status:false},{color:'#43A047',status:false},{color:'#FFEB3B',status:false},{color:'#FB8C00',status:false},{color:'#8f6255',status:false},{color:'#546E7A',status:false}];

export default {
  editorBtns,
  editorBtnStyle,
  fontColor
}
