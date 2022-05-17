import Node from '../core/Node';
import PropertyNode from '../core/PropertyNode';
import ContextNode from '../core/ContextNode';

class CondNode extends Node {
  constructor(condNode, ifNode, elseNode) {
    super();

    this.condNode = condNode;

    this.ifNode = ifNode;
    this.elseNode = elseNode;
  }

  getNodeType(builder) {
    const ifType = this.ifNode.getNodeType(builder);
    const elseType = this.elseNode.getNodeType(builder);

    if (builder.getTypeLength(elseType) > builder.getTypeLength(ifType)) {
      return elseType;
    }

    return ifType;
  }

  generate(builder) {
    const type = this.getNodeType(builder);

    const context = { tempWrite: false };
    const nodeProperty = new PropertyNode(null, type).build(builder);

    const nodeSnippet = new ContextNode(this.condNode /*, context*/).build(builder, 'bool'),
      ifSnippet = new ContextNode(this.ifNode, context).build(builder, type),
      elseSnippet = new ContextNode(this.elseNode, context).build(builder, type);

    builder.addFlowCode(`if ( ${nodeSnippet} ) {

\t\t${nodeProperty} = ${ifSnippet};

\t} else {

\t\t${nodeProperty} = ${elseSnippet};

\t}`);

    return nodeProperty;
  }
}

export default CondNode;
