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

export class AgentOption {
  name: string = '';
  caption: string = '';
  type: OptionType = OptionType.Unkown;
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
