import { SelectInput, Element } from '../../libs/flow.module';
import { BaseNode } from '../core/BaseNode';
import { PositionNode } from 'three-nodes/Nodes';

export class PositionEditor extends BaseNode {
  constructor() {
    const node = new PositionNode();

    super('Position', 3, node, 200);

    const optionsField = new SelectInput(
      [
        { name: 'Local', value: PositionNode.LOCAL },
        { name: 'World', value: PositionNode.WORLD },
        { name: 'View', value: PositionNode.VIEW },
        { name: 'View Direction', value: PositionNode.VIEW_DIRECTION },
      ],
      PositionNode.LOCAL
    ).onChange(() => {
      node.scope = optionsField.getValue();

      this.invalidate();
    });

    this.add(new Element().add(optionsField));
  }
}