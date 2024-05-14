import { v4 as uuidv4 } from 'uuid';
import { AgentOption } from './agent-option';

export enum AgentType {
  None = 0,
  System = 1,
  Group = 2,
  Entity = 3,
  Equipment = 4,
  Sensor = 5
}

export class DuanAgent {
  private _id: string;
  private _inputs: AgentOption;
  private _outputs: AgentOption;
  private _createTime: Date;

  public name: string;
  public caption: string;
  public type: AgentType;

  get id(): string {
    return this._id;
  }

  get createTime(): Date {
    return this._createTime;
  }

  get inputs(): AgentOption {
    return this._inputs;
  }

  get outputs(): AgentOption {
    return this._outputs;
  }

  private constructor(id: string = uuidv4(), createTime: Date = new Date()) {
    this._id = id;
    this._inputs = new AgentOption();
    this._outputs = new AgentOption();
    this._createTime = createTime;
    this.name = 'duan-agent';
    this.caption = 'DuanAgent';
    this.type = AgentType.None;
  }

  static newInstance(
    name: string,
    caption: string,
    type: AgentType
  ): DuanAgent {
    const agent = new DuanAgent();
    agent.name = name;
    agent.caption = caption;
    agent.type = type;
    return agent;
  }

  static getInstance(
    id: string,
    name: string,
    caption: string,
    type: AgentType,
    inputs: AgentOption,
    outputs: AgentOption,
    createTime: Date
  ): DuanAgent {
    const agent = new DuanAgent(id, createTime);
    agent.name = name;
    agent.caption = caption;
    agent.type = type;
    agent._inputs = inputs;
    agent._outputs = outputs;
    return agent;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      caption: this.caption,
      type: this.type,
      inputs: this.inputs.toJSON(),
      outputs: this.outputs.toJSON(),
      createTime: this.createTime
    };
  }

  static fromJson(json: any): DuanAgent {
    const agent = this.getInstance(
      json.id,
      json.name,
      json.caption,
      json.type,
      json.inputs,
      json.outputs,
      json.createTime
    );
    return agent;
  }
}

export class KeyExistsError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}
