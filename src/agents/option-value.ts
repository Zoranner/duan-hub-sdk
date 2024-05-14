export class Range {
  min: number = 0;
  max: number = 0;

  toString(): string {
    return `(${this.min}, ${this.max})`;
  }
}

export class Band {
  uplink: Range = new Range();
  downlink: Range = new Range();

  toString(): string {
    return `[${this.uplink}, ${this.downlink}]`;
  }
}

export class Vector2 {
  x: number = 0;
  y: number = 0;

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}

export class Vector3 {
  x: number = 0;
  y: number = 0;
  z: number = 0;

  toString(): string {
    return `(${this.x}, ${this.y}, ${this.z})`;
  }
}

export class Quaternion {
  x: number = 0;
  y: number = 0;
  z: number = 0;
  w: number = 1;

  toString(): string {
    return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
  }
}

export interface IOptionValue {}

abstract class BasicValue<TValue> implements IOptionValue {
  current!: TValue;
}

export class StringValue extends BasicValue<string> {}

export interface BooleanValue extends BasicValue<boolean> {}

class NumberValue extends BasicValue<number> {
  min: number = 0;
  max: number = 0;
}

export interface IntValue extends NumberValue {}

export interface DoubleValue extends NumberValue {}

export interface Vector2Value extends BasicValue<Vector2> {}

export interface Vector3Value extends BasicValue<Vector3> {}

export interface QuaternionValue extends BasicValue<Quaternion> {}

export interface EnumItem {
  caption: string;
  trigger: string[];
}

export interface EnumValue extends BasicValue<number> {
  items: EnumItem[];
}

interface RangeValue extends BasicValue<Range> {
  min: number;
  max: number;
}

export interface IntRangeValue extends RangeValue {}

export interface DoubleRangeValue extends RangeValue {}

interface BandValue extends BasicValue<Band> {
  min: number;
  max: number;
}

export interface IntBandValue extends BandValue {}

export interface DoubleBandValue extends BandValue {}
