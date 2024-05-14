import { KeyExistsError, KeyNotExistsError } from '../errors/error-exception';
import {
  StringValue,
  BooleanValue,
  IntValue,
  DoubleValue,
  Vector2Value,
  Vector3Value,
  QuaternionValue,
  EnumValue,
  IntRangeValue,
  DoubleRangeValue,
  IntBandValue,
  DoubleBandValue
} from './option-value';

export enum OptionType {
  Unkown = 0,
  String = 101,
  Boolean = 102,
  Int = 201,
  Double = 202,
  Vector2 = 302,
  Vector3 = 303,
  Quaternion = 304,
  Enum = 401,
  IntRange = 501,
  DoubleRange = 502,
  IntBand = 601,
  DoubleBand = 602
}

export class DisplaySet {
  factor: number = 1.0;
  unit: string = '';
}

export class OptionItem {
  caption: string = '';
  type: OptionType = OptionType.Unkown;
  group: string = '';
  value:
    | null
    | StringValue
    | IntValue
    | DoubleValue
    | BooleanValue
    | EnumValue
    | IntRangeValue
    | DoubleRangeValue
    | IntBandValue
    | DoubleBandValue
    | Vector2Value
    | Vector3Value
    | QuaternionValue = null;
  display: DisplaySet = new DisplaySet();
}

export interface IAgentOptions {
  groups: Record<string, string>;
  items: Record<string, OptionItem>;
}

export class AgentOptions {
  private _groups: Map<string, string>;
  private _items: Map<string, OptionItem>;

  get groups(): { [name: string]: string } {
    return Object.fromEntries(this._groups);
  }

  get items(): { [name: string]: OptionItem } {
    return Object.fromEntries(this._items);
  }

  constructor() {
    this._groups = new Map<string, string>();
    this._items = new Map<string, OptionItem>();
  }

  public containGroup(name: string): boolean {
    return this._groups.has(name);
  }

  public addGroup(name: string, caption: string): void {
    if (this._groups.has(name)) {
      throw new KeyExistsError(`Group with name "${name}" already exists.`);
    }
    this._groups.set(name, caption);
  }

  public setGroup(name: string, caption: string) {
    if (!this._groups.has(name)) {
      throw new KeyNotExistsError(`Group with name "${name}" does not exist.`);
    }
    this._groups.set(name, caption);
  }

  public removeGroup(name: string) {
    if (!this._groups.has(name)) {
      throw new KeyNotExistsError(`Group with name "${name}" does not exist.`);
    }
    this._groups.delete(name);
  }

  public containOption(name: string): boolean {
    return this._items.has(name);
  }

  public addOption(name: string, option: OptionItem): void {
    if (this._items.has(name)) {
      throw new KeyExistsError(`Option with name "${name}" already exists.`);
    }
    if (option.group && !this._groups.has(option.group)) {
      throw new KeyNotExistsError(
        `Group with name "${option.group}" does not exist.`
      );
    }
    this._items.set(name, option);
  }

  public setOption(name: string, option: OptionItem): void {
    if (!this._items.has(name)) {
      throw new KeyNotExistsError(`Option with name "${name}" does not exist.`);
    }
    if (option.group && !this._groups.has(option.group)) {
      throw new KeyNotExistsError(
        `Group with name "${option.group}" does not exist.`
      );
    }
    this._items.set(name, option);
  }

  public removeOption(name: string): void {
    if (!this._items.has(name)) {
      throw new KeyNotExistsError(`Option with name "${name}" does not exist.`);
    }
    this._items.delete(name);
  }

  toJSON(): IAgentOptions {
    return {
      groups: this.groups,
      items: this.items
    };
  }

  static fromJSON(json: IAgentOptions): AgentOptions {
    const options = new AgentOptions();
    for (const [name, caption] of Object.entries(json.groups)) {
      options.addGroup(name, caption);
    }
    for (const [name, option] of Object.entries(json.items)) {
      options.addOption(name, option);
    }
    return options;
  }
}
