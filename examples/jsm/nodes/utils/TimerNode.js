import UniformNode from '../core/UniformNode';
import { NodeUpdateType } from '../core/constants';

class TimerNode extends UniformNode {
  static LOCAL = 'local';
  static GLOBAL = 'global';
  static DELTA = 'delta';

  constructor(scope = TimerNode.LOCAL, scale = 1) {
    super(0);

    this.scope = scope;
    this.scale = scale;

    this.updateType = NodeUpdateType.Frame;
  }

  update(frame) {
    const scope = this.scope;
    const scale = this.scale;

    if (scope === TimerNode.LOCAL) {
      this.value += frame.deltaTime * scale;
    } else if (scope === TimerNode.DELTA) {
      this.value = frame.deltaTime * scale;
    } else {
      // global

      this.value = frame.time * scale;
    }
  }

  serialize(data) {
    super.serialize(data);

    data.scope = this.scope;
    data.scale = this.scale;
  }

  deserialize(data) {
    super.deserialize(data);

    this.scope = data.scope;
    this.scale = data.scale;
  }
}

export default TimerNode;