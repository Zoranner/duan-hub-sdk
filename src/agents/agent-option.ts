import {
  StringValue,
  IntValue,
  DoubleValue,
  BooleanValue,
  EnumValue,
  IntRangeValue,
  DoubleRangeValue,
  IntBandValue,
  DoubleBandValue,
  Vector2Value,
  Vector3Value,
  QuaternionValue
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
  name: string = '';
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

export class AgentOption {
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

  public addGroup(name: string, caption: string): void {
    if (this._groups.has(name)) {
      throw new KeyExistsError(
        `Input option with name "${name}" already exists.`
      );
    }
    this._groups.set(name, caption);
  }

  public removeGroup(name: string) {
    if (!this._groups.has(name)) {
      throw new KeyExistsError(
        `Input option with name "${name}" already exists.`
      );
    }
    this._groups.delete(name);
  }

  public addOption(option: OptionItem): void {
    if (this._items.has(option.name)) {
      throw new KeyExistsError(
        `Output option with name "${option.name}" already exists.`
      );
    }
    if (option.group && !this._groups.has(option.group)) {
      throw new KeyExistsError(
        `Output option with name "${option.name}" already exists.`
      );
    }
    this._items.set(option.name, option);
  }

  public removeOption(name: string): void {
    if (!this._items.has(name)) {
      throw new KeyExistsError(
        `Output option with name "${name}" already exists.`
      );
    }
    this._items.delete(name);
  }

  toJSON() {
    return {
      groups: this.groups,
      items: this.items
    };
  }

  static fromJson(json: any): AgentOption {
    const option = new AgentOption();
    option._groups = json.groups;
    option._items = json.items;
    return option;
  }
}

export class KeyExistsError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}
