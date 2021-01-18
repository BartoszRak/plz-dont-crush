import { TinyTypeOf } from "tiny-types";

export class VehicleId extends TinyTypeOf<number>() {}

export class VehicleName extends TinyTypeOf<string>() {}

export class VehicleModel extends TinyTypeOf<string>() {}