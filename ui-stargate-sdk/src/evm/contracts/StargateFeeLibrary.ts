/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace Pool {
  export type SwapObjStruct = {
    amount: PromiseOrValue<BigNumberish>;
    eqFee: PromiseOrValue<BigNumberish>;
    eqReward: PromiseOrValue<BigNumberish>;
    lpFee: PromiseOrValue<BigNumberish>;
    protocolFee: PromiseOrValue<BigNumberish>;
    lkbRemove: PromiseOrValue<BigNumberish>;
  };

  export type SwapObjStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    amount: BigNumber;
    eqFee: BigNumber;
    eqReward: BigNumber;
    lpFee: BigNumber;
    protocolFee: BigNumber;
    lkbRemove: BigNumber;
  };
}

export interface StargateFeeLibraryInterface extends utils.Interface {
  functions: {
    "BP_DENOMINATOR()": FunctionFragment;
    "VERSION()": FunctionFragment;
    "eqFeeBP()": FunctionFragment;
    "eqRewardBP()": FunctionFragment;
    "factory()": FunctionFragment;
    "getFees(uint256,uint256,uint16,address,uint256)": FunctionFragment;
    "lpFeeBP()": FunctionFragment;
    "owner()": FunctionFragment;
    "protocolFeeBP()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setFees(uint256,uint256,uint256,uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "BP_DENOMINATOR"
      | "VERSION"
      | "eqFeeBP"
      | "eqRewardBP"
      | "factory"
      | "getFees"
      | "lpFeeBP"
      | "owner"
      | "protocolFeeBP"
      | "renounceOwnership"
      | "setFees"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "BP_DENOMINATOR",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "VERSION", values?: undefined): string;
  encodeFunctionData(functionFragment: "eqFeeBP", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "eqRewardBP",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "factory", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getFees",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(functionFragment: "lpFeeBP", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "protocolFeeBP",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setFees",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "BP_DENOMINATOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "VERSION", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "eqFeeBP", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "eqRewardBP", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getFees", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "lpFeeBP", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "protocolFeeBP",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setFees", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "FeesUpdated(uint256,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "FeesUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface FeesUpdatedEventObject {
  lpFeeBP: BigNumber;
  protocolFeeBP: BigNumber;
}
export type FeesUpdatedEvent = TypedEvent<
  [BigNumber, BigNumber],
  FeesUpdatedEventObject
>;

export type FeesUpdatedEventFilter = TypedEventFilter<FeesUpdatedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface StargateFeeLibrary extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: StargateFeeLibraryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    BP_DENOMINATOR(overrides?: CallOverrides): Promise<[BigNumber]>;

    VERSION(overrides?: CallOverrides): Promise<[string]>;

    eqFeeBP(overrides?: CallOverrides): Promise<[BigNumber]>;

    eqRewardBP(overrides?: CallOverrides): Promise<[BigNumber]>;

    factory(overrides?: CallOverrides): Promise<[string]>;

    getFees(
      _srcPoolId: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<string>,
      _amountSD: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[Pool.SwapObjStructOutput] & { s: Pool.SwapObjStructOutput }>;

    lpFeeBP(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    protocolFeeBP(overrides?: CallOverrides): Promise<[BigNumber]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setFees(
      _lpFeeBP: PromiseOrValue<BigNumberish>,
      _protocolFeeBP: PromiseOrValue<BigNumberish>,
      _eqFeeBP: PromiseOrValue<BigNumberish>,
      _eqRewardBP: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  BP_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;

  VERSION(overrides?: CallOverrides): Promise<string>;

  eqFeeBP(overrides?: CallOverrides): Promise<BigNumber>;

  eqRewardBP(overrides?: CallOverrides): Promise<BigNumber>;

  factory(overrides?: CallOverrides): Promise<string>;

  getFees(
    _srcPoolId: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<BigNumberish>,
    arg2: PromiseOrValue<BigNumberish>,
    arg3: PromiseOrValue<string>,
    _amountSD: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<Pool.SwapObjStructOutput>;

  lpFeeBP(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  protocolFeeBP(overrides?: CallOverrides): Promise<BigNumber>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setFees(
    _lpFeeBP: PromiseOrValue<BigNumberish>,
    _protocolFeeBP: PromiseOrValue<BigNumberish>,
    _eqFeeBP: PromiseOrValue<BigNumberish>,
    _eqRewardBP: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    BP_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;

    VERSION(overrides?: CallOverrides): Promise<string>;

    eqFeeBP(overrides?: CallOverrides): Promise<BigNumber>;

    eqRewardBP(overrides?: CallOverrides): Promise<BigNumber>;

    factory(overrides?: CallOverrides): Promise<string>;

    getFees(
      _srcPoolId: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<string>,
      _amountSD: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<Pool.SwapObjStructOutput>;

    lpFeeBP(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    protocolFeeBP(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setFees(
      _lpFeeBP: PromiseOrValue<BigNumberish>,
      _protocolFeeBP: PromiseOrValue<BigNumberish>,
      _eqFeeBP: PromiseOrValue<BigNumberish>,
      _eqRewardBP: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "FeesUpdated(uint256,uint256)"(
      lpFeeBP?: null,
      protocolFeeBP?: null
    ): FeesUpdatedEventFilter;
    FeesUpdated(lpFeeBP?: null, protocolFeeBP?: null): FeesUpdatedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    BP_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;

    VERSION(overrides?: CallOverrides): Promise<BigNumber>;

    eqFeeBP(overrides?: CallOverrides): Promise<BigNumber>;

    eqRewardBP(overrides?: CallOverrides): Promise<BigNumber>;

    factory(overrides?: CallOverrides): Promise<BigNumber>;

    getFees(
      _srcPoolId: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<string>,
      _amountSD: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lpFeeBP(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    protocolFeeBP(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setFees(
      _lpFeeBP: PromiseOrValue<BigNumberish>,
      _protocolFeeBP: PromiseOrValue<BigNumberish>,
      _eqFeeBP: PromiseOrValue<BigNumberish>,
      _eqRewardBP: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    BP_DENOMINATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    VERSION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    eqFeeBP(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    eqRewardBP(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    factory(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getFees(
      _srcPoolId: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<string>,
      _amountSD: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lpFeeBP(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    protocolFeeBP(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setFees(
      _lpFeeBP: PromiseOrValue<BigNumberish>,
      _protocolFeeBP: PromiseOrValue<BigNumberish>,
      _eqFeeBP: PromiseOrValue<BigNumberish>,
      _eqRewardBP: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
