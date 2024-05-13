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
  private _inputs: Map<string, AgentOption>;
  private _outputs: Map<string, AgentOption>;
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

  get inputs(): AgentOption[] {
    return Array.from(this._inputs.values());
  }

  get outputs(): AgentOption[] {
    return Array.from(this._outputs.values());
  }

  private constructor(id: string = uuidv4(), createTime: Date = new Date()) {
    this._id = id;
    this._inputs = new Map();
    this._outputs = new Map();
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
    inputs: Map<string, AgentOption>,
    outputs: Map<string, AgentOption>,
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

  public addInputOption(option: AgentOption): void {
    if (this._inputs.has(option.name)) {
      throw new KeyExistsError(
        `Input option with name "${option.name}" already exists.`
      );
    }
    this._inputs.set(option.name, option);
  }

  public addOutputOption(option: AgentOption): void {
    if (this._outputs.has(option.name)) {
      throw new KeyExistsError(
        `Output option with name "${option.name}" already exists.`
      );
    }
    this._outputs.set(option.name, option);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      caption: this.caption,
      type: this.type,
      inputs: this.inputs,
      outputs: this.outputs,
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
