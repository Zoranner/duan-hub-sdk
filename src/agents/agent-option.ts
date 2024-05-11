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
  String = 1,
  Int = 2,
  Double = 3,
  Boolean = 4,
  Enum = 5,
  IntRange = 6,
  DoubleRange = 7,
  IntBand = 8,
  DoubleBand = 9
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
