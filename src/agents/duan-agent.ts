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

  public caption: string;
  public type: AgentType;

  get id(): string {
    return this._id;
  }

  get inputs(): AgentOption[] {
    return Array.from(this._inputs.values());
  }

  get outputs(): AgentOption[] {
    return Array.from(this._outputs.values());
  }

  constructor(
    id: string = uuidv4(),
    caption: string = '',
    type: AgentType = AgentType.None
  ) {
    this._id = id;
    this._inputs = new Map();
    this._outputs = new Map();
    this.caption = caption;
    this.type = type;
  }

  public addInputOption(option: AgentOption): void {
    if (this._inputs.has(option.name)) {
      new OptionNameExistError(
        `Input option with name "${option.name}" already exists.`
      );
      return;
    }
    this._inputs.set(option.name, option);
  }

  public addOutputOption(option: AgentOption): void {
    if (this._outputs.has(option.name)) {
      new OptionNameExistError(
        `Output option with name "${option.name}" already exists.`
      );
      return;
    }
    this._outputs.set(option.name, option);
  }
}

export class OptionNameExistError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}
