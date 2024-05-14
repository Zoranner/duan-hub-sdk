import { v4 as uuidv4 } from 'uuid';
import { AgentOptions, IAgentOptions } from './agent-option';

export enum AgentType {
  None = 0,
  System = 1,
  Group = 2,
  Entity = 3,
  Equipment = 4,
  Sensor = 5
}

export interface IDuanAgent {
  id: string;
  name: string;
  caption: string;
  type: AgentType;
  inputs: IAgentOptions;
  outputs: IAgentOptions;
  createTime: Date;
}

export class DuanAgent {
  private _id: string;
  private _inputs: AgentOptions;
  private _outputs: AgentOptions;
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

  get inputs(): AgentOptions {
    return this._inputs;
  }

  get outputs(): AgentOptions {
    return this._outputs;
  }

  private constructor(id: string = uuidv4(), createTime: Date = new Date()) {
    this._id = id;
    this._inputs = new AgentOptions();
    this._outputs = new AgentOptions();
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
    inputs: AgentOptions,
    outputs: AgentOptions,
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

  toJSON(): IDuanAgent {
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

  static fromJSON(json: IDuanAgent): DuanAgent {
    const agent = this.getInstance(
      json.id,
      json.name,
      json.caption,
      json.type,
      AgentOptions.fromJSON(json.inputs),
      AgentOptions.fromJSON(json.outputs),
      json.createTime
    );
    return agent;
  }
}
