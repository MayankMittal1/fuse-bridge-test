import { ChainId } from '@layerzerolabs/lz-sdk';
import { Token, Currency, CurrencyAmount, Transaction, AdapterParams, FeeQuote } from '@layerzerolabs/ui-core';
import { BridgeApi, TransferInput } from '@layerzerolabs/ui-bridge-sdk';
import { ProviderFactory } from '@layerzerolabs/ui-evm';
import { Event, EventFilter, BigNumberish, BytesLike, BigNumber, BaseContract, Signer, Overrides, ContractTransaction, CallOverrides, PayableOverrides, PopulatedTransaction, utils } from 'ethers';
import { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import { Listener, Provider } from '@ethersproject/providers';
import { ERC20__api } from '@layerzerolabs/ui-erc20-sdk';

declare const mainnet: StargateConfig;

interface TypedEvent<TArgsArray extends Array<any> = any, TArgsObject = any> extends Event {
    args: TArgsArray & TArgsObject;
}
interface TypedEventFilter<_TEvent extends TypedEvent> extends EventFilter {
}
interface TypedListener<TEvent extends TypedEvent> {
    (...listenerArg: [...__TypechainArgsArray<TEvent>, TEvent]): void;
}
type __TypechainArgsArray<T> = T extends TypedEvent<infer U> ? U : never;
interface OnEvent<TRes> {
    <TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>, listener: TypedListener<TEvent>): TRes;
    (eventName: string, listener: Listener): TRes;
}
type PromiseOrValue<T> = T | Promise<T>;

declare namespace Pool$2 {
    type CreditObjStruct = {
        credits: PromiseOrValue<BigNumberish>;
        idealBalance: PromiseOrValue<BigNumberish>;
    };
    type CreditObjStructOutput = [BigNumber, BigNumber] & {
        credits: BigNumber;
        idealBalance: BigNumber;
    };
    type SwapObjStruct = {
        amount: PromiseOrValue<BigNumberish>;
        eqFee: PromiseOrValue<BigNumberish>;
        eqReward: PromiseOrValue<BigNumberish>;
        lpFee: PromiseOrValue<BigNumberish>;
        protocolFee: PromiseOrValue<BigNumberish>;
        lkbRemove: PromiseOrValue<BigNumberish>;
    };
    type SwapObjStructOutput = [
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
interface RouterInterface extends utils.Interface {
    functions: {
        "activateChainPath(uint256,uint16,uint256)": FunctionFragment;
        "addLiquidity(uint256,uint256,address)": FunctionFragment;
        "bridge()": FunctionFragment;
        "cachedSwapLookup(uint16,bytes,uint256)": FunctionFragment;
        "callDelta(uint256,bool)": FunctionFragment;
        "clearCachedSwap(uint16,bytes,uint256)": FunctionFragment;
        "createChainPath(uint256,uint16,uint256,uint256)": FunctionFragment;
        "createPool(uint256,address,uint8,uint8,string,string)": FunctionFragment;
        "creditChainPath(uint16,uint256,uint256,(uint256,uint256))": FunctionFragment;
        "factory()": FunctionFragment;
        "instantRedeemLocal(uint16,uint256,address)": FunctionFragment;
        "mintFeeOwner()": FunctionFragment;
        "owner()": FunctionFragment;
        "protocolFeeOwner()": FunctionFragment;
        "quoteLayerZeroFee(uint16,uint8,bytes,bytes,(uint256,uint256,bytes))": FunctionFragment;
        "redeemLocal(uint16,uint256,uint256,address,uint256,bytes,(uint256,uint256,bytes))": FunctionFragment;
        "redeemLocalCallback(uint16,bytes,uint256,uint256,uint256,address,uint256,uint256)": FunctionFragment;
        "redeemLocalCheckOnRemote(uint16,bytes,uint256,uint256,uint256,uint256,bytes)": FunctionFragment;
        "redeemRemote(uint16,uint256,uint256,address,uint256,uint256,bytes,(uint256,uint256,bytes))": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "retryRevert(uint16,bytes,uint256)": FunctionFragment;
        "revertLookup(uint16,bytes,uint256)": FunctionFragment;
        "revertRedeemLocal(uint16,bytes,uint256,address,(uint256,uint256,bytes))": FunctionFragment;
        "sendCredits(uint16,uint256,uint256,address)": FunctionFragment;
        "setBridgeAndFactory(address,address)": FunctionFragment;
        "setDeltaParam(uint256,bool,uint256,uint256,bool,bool)": FunctionFragment;
        "setFeeLibrary(uint256,address)": FunctionFragment;
        "setFees(uint256,uint256)": FunctionFragment;
        "setMintFeeOwner(address)": FunctionFragment;
        "setProtocolFeeOwner(address)": FunctionFragment;
        "setSwapStop(uint256,bool)": FunctionFragment;
        "setWeightForChainPath(uint256,uint16,uint256,uint16)": FunctionFragment;
        "swap(uint16,uint256,uint256,address,uint256,uint256,(uint256,uint256,bytes),bytes,bytes)": FunctionFragment;
        "swapRemote(uint16,bytes,uint256,uint256,uint256,uint256,address,(uint256,uint256,uint256,uint256,uint256,uint256),bytes)": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
        "withdrawMintFee(uint256,address)": FunctionFragment;
        "withdrawProtocolFee(uint256,address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "activateChainPath" | "addLiquidity" | "bridge" | "cachedSwapLookup" | "callDelta" | "clearCachedSwap" | "createChainPath" | "createPool" | "creditChainPath" | "factory" | "instantRedeemLocal" | "mintFeeOwner" | "owner" | "protocolFeeOwner" | "quoteLayerZeroFee" | "redeemLocal" | "redeemLocalCallback" | "redeemLocalCheckOnRemote" | "redeemRemote" | "renounceOwnership" | "retryRevert" | "revertLookup" | "revertRedeemLocal" | "sendCredits" | "setBridgeAndFactory" | "setDeltaParam" | "setFeeLibrary" | "setFees" | "setMintFeeOwner" | "setProtocolFeeOwner" | "setSwapStop" | "setWeightForChainPath" | "swap" | "swapRemote" | "transferOwnership" | "withdrawMintFee" | "withdrawProtocolFee"): FunctionFragment;
    encodeFunctionData(functionFragment: "activateChainPath", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "addLiquidity", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "bridge", values?: undefined): string;
    encodeFunctionData(functionFragment: "cachedSwapLookup", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "callDelta", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "clearCachedSwap", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "createChainPath", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "createPool", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "creditChainPath", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        Pool$2.CreditObjStruct
    ]): string;
    encodeFunctionData(functionFragment: "factory", values?: undefined): string;
    encodeFunctionData(functionFragment: "instantRedeemLocal", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "mintFeeOwner", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "protocolFeeOwner", values?: undefined): string;
    encodeFunctionData(functionFragment: "quoteLayerZeroFee", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        Router.LzTxObjStruct
    ]): string;
    encodeFunctionData(functionFragment: "redeemLocal", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        Router.LzTxObjStruct
    ]): string;
    encodeFunctionData(functionFragment: "redeemLocalCallback", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "redeemLocalCheckOnRemote", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "redeemRemote", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        Router.LzTxObjStruct
    ]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "retryRevert", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "revertLookup", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "revertRedeemLocal", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        Router.LzTxObjStruct
    ]): string;
    encodeFunctionData(functionFragment: "sendCredits", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "setBridgeAndFactory", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setDeltaParam", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<boolean>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<boolean>,
        PromiseOrValue<boolean>
    ]): string;
    encodeFunctionData(functionFragment: "setFeeLibrary", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setFees", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "setMintFeeOwner", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setProtocolFeeOwner", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setSwapStop", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "setWeightForChainPath", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "swap", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        Router.LzTxObjStruct,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "swapRemote", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        Pool$2.SwapObjStruct,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "withdrawMintFee", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "withdrawProtocolFee", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "activateChainPath", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addLiquidity", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "bridge", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cachedSwapLookup", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "callDelta", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "clearCachedSwap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createChainPath", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createPool", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "creditChainPath", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "instantRedeemLocal", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintFeeOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "protocolFeeOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "quoteLayerZeroFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "redeemLocal", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "redeemLocalCallback", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "redeemLocalCheckOnRemote", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "redeemRemote", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "retryRevert", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revertLookup", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revertRedeemLocal", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sendCredits", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setBridgeAndFactory", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setDeltaParam", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setFeeLibrary", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setFees", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setMintFeeOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setProtocolFeeOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSwapStop", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setWeightForChainPath", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "swapRemote", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawMintFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawProtocolFee", data: BytesLike): Result;
    events: {
        "CachedSwapSaved(uint16,bytes,uint256,address,uint256,address,bytes)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
        "ReceiveFailed(uint16,bytes,uint256,address,uint256,bytes,string)": EventFragment;
        "Revert(uint8,uint16,bytes,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "CachedSwapSaved"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ReceiveFailed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Revert"): EventFragment;
}
interface CachedSwapSavedEventObject {
    chainId: number;
    srcAddress: string;
    nonce: BigNumber;
    token: string;
    amountLD: BigNumber;
    to: string;
    payload: string;
}
type CachedSwapSavedEvent = TypedEvent<[
    number,
    string,
    BigNumber,
    string,
    BigNumber,
    string,
    string
], CachedSwapSavedEventObject>;
type CachedSwapSavedEventFilter = TypedEventFilter<CachedSwapSavedEvent>;
interface OwnershipTransferredEventObject$1 {
    previousOwner: string;
    newOwner: string;
}
type OwnershipTransferredEvent$1 = TypedEvent<[
    string,
    string
], OwnershipTransferredEventObject$1>;
type OwnershipTransferredEventFilter$1 = TypedEventFilter<OwnershipTransferredEvent$1>;
interface ReceiveFailedEventObject {
    chainId: number;
    srcAddress: string;
    nonce: BigNumber;
    token: string;
    amountLD: BigNumber;
    payload: string;
    reason: string;
}
type ReceiveFailedEvent = TypedEvent<[
    number,
    string,
    BigNumber,
    string,
    BigNumber,
    string,
    string
], ReceiveFailedEventObject>;
type ReceiveFailedEventFilter = TypedEventFilter<ReceiveFailedEvent>;
interface RevertEventObject {
    bridgeFunctionType: number;
    chainId: number;
    srcAddress: string;
    nonce: BigNumber;
}
type RevertEvent = TypedEvent<[
    number,
    number,
    string,
    BigNumber
], RevertEventObject>;
type RevertEventFilter = TypedEventFilter<RevertEvent>;
declare namespace Router {
    type LzTxObjStruct = {
        dstGasForCall: PromiseOrValue<BigNumberish>;
        dstNativeAmount: PromiseOrValue<BigNumberish>;
        dstNativeAddr: PromiseOrValue<BytesLike>;
    };
    type LzTxObjStructOutput = [BigNumber, BigNumber, string] & {
        dstGasForCall: BigNumber;
        dstNativeAmount: BigNumber;
        dstNativeAddr: string;
    };
}
interface Router extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: RouterInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        activateChainPath(_poolId: PromiseOrValue<BigNumberish>, _dstChainId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        addLiquidity(_poolId: PromiseOrValue<BigNumberish>, _amountLD: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        bridge(overrides?: CallOverrides): Promise<[string]>;
        cachedSwapLookup(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BytesLike>, arg2: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            string,
            BigNumber,
            string,
            string
        ] & {
            token: string;
            amountLD: BigNumber;
            to: string;
            payload: string;
        }>;
        callDelta(_poolId: PromiseOrValue<BigNumberish>, _fullMode: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        clearCachedSwap(_dstChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        createChainPath(_poolId: PromiseOrValue<BigNumberish>, _dstChainId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _weight: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        createPool(_poolId: PromiseOrValue<BigNumberish>, _token: PromiseOrValue<string>, _sharedDecimals: PromiseOrValue<BigNumberish>, _localDecimals: PromiseOrValue<BigNumberish>, _name: PromiseOrValue<string>, _symbol: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        creditChainPath(_dstChainId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _c: Pool$2.CreditObjStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        factory(overrides?: CallOverrides): Promise<[string]>;
        instantRedeemLocal(_srcPoolId: PromiseOrValue<BigNumberish>, _amountLP: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        mintFeeOwner(overrides?: CallOverrides): Promise<[string]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        protocolFeeOwner(overrides?: CallOverrides): Promise<[string]>;
        quoteLayerZeroFee(_dstChainId: PromiseOrValue<BigNumberish>, _functionType: PromiseOrValue<BigNumberish>, _toAddress: PromiseOrValue<BytesLike>, _transferAndCallPayload: PromiseOrValue<BytesLike>, _lzTxParams: Router.LzTxObjStruct, overrides?: CallOverrides): Promise<[BigNumber, BigNumber]>;
        redeemLocal(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, _amountLP: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<BytesLike>, _lzTxParams: Router.LzTxObjStruct, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        redeemLocalCallback(_srcChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, _amountSD: PromiseOrValue<BigNumberish>, _mintAmountSD: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        redeemLocalCheckOnRemote(_srcChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _amountSD: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        redeemRemote(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, _amountLP: PromiseOrValue<BigNumberish>, _minAmountLD: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<BytesLike>, _lzTxParams: Router.LzTxObjStruct, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        retryRevert(_dstChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        revertLookup(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BytesLike>, arg2: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        revertRedeemLocal(_dstChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, _lzTxParams: Router.LzTxObjStruct, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        sendCredits(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setBridgeAndFactory(_bridge: PromiseOrValue<string>, _factory: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setDeltaParam(_poolId: PromiseOrValue<BigNumberish>, _batched: PromiseOrValue<boolean>, _swapDeltaBP: PromiseOrValue<BigNumberish>, _lpDeltaBP: PromiseOrValue<BigNumberish>, _defaultSwapMode: PromiseOrValue<boolean>, _defaultLPMode: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setFeeLibrary(_poolId: PromiseOrValue<BigNumberish>, _feeLibraryAddr: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setFees(_poolId: PromiseOrValue<BigNumberish>, _mintFeeBP: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setMintFeeOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setProtocolFeeOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setSwapStop(_poolId: PromiseOrValue<BigNumberish>, _swapStop: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setWeightForChainPath(_poolId: PromiseOrValue<BigNumberish>, _dstChainId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _weight: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        swap(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, _amountLD: PromiseOrValue<BigNumberish>, _minAmountLD: PromiseOrValue<BigNumberish>, _lzTxParams: Router.LzTxObjStruct, _to: PromiseOrValue<BytesLike>, _payload: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        swapRemote(_srcChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _dstGasForCall: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, _s: Pool$2.SwapObjStruct, _payload: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        withdrawMintFee(_poolId: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        withdrawProtocolFee(_poolId: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    activateChainPath(_poolId: PromiseOrValue<BigNumberish>, _dstChainId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    addLiquidity(_poolId: PromiseOrValue<BigNumberish>, _amountLD: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    bridge(overrides?: CallOverrides): Promise<string>;
    cachedSwapLookup(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BytesLike>, arg2: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        string,
        BigNumber,
        string,
        string
    ] & {
        token: string;
        amountLD: BigNumber;
        to: string;
        payload: string;
    }>;
    callDelta(_poolId: PromiseOrValue<BigNumberish>, _fullMode: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    clearCachedSwap(_dstChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    createChainPath(_poolId: PromiseOrValue<BigNumberish>, _dstChainId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _weight: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    createPool(_poolId: PromiseOrValue<BigNumberish>, _token: PromiseOrValue<string>, _sharedDecimals: PromiseOrValue<BigNumberish>, _localDecimals: PromiseOrValue<BigNumberish>, _name: PromiseOrValue<string>, _symbol: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    creditChainPath(_dstChainId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _c: Pool$2.CreditObjStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    factory(overrides?: CallOverrides): Promise<string>;
    instantRedeemLocal(_srcPoolId: PromiseOrValue<BigNumberish>, _amountLP: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    mintFeeOwner(overrides?: CallOverrides): Promise<string>;
    owner(overrides?: CallOverrides): Promise<string>;
    protocolFeeOwner(overrides?: CallOverrides): Promise<string>;
    quoteLayerZeroFee(_dstChainId: PromiseOrValue<BigNumberish>, _functionType: PromiseOrValue<BigNumberish>, _toAddress: PromiseOrValue<BytesLike>, _transferAndCallPayload: PromiseOrValue<BytesLike>, _lzTxParams: Router.LzTxObjStruct, overrides?: CallOverrides): Promise<[BigNumber, BigNumber]>;
    redeemLocal(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, _amountLP: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<BytesLike>, _lzTxParams: Router.LzTxObjStruct, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    redeemLocalCallback(_srcChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, _amountSD: PromiseOrValue<BigNumberish>, _mintAmountSD: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    redeemLocalCheckOnRemote(_srcChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _amountSD: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    redeemRemote(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, _amountLP: PromiseOrValue<BigNumberish>, _minAmountLD: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<BytesLike>, _lzTxParams: Router.LzTxObjStruct, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renounceOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    retryRevert(_dstChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    revertLookup(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BytesLike>, arg2: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    revertRedeemLocal(_dstChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, _lzTxParams: Router.LzTxObjStruct, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    sendCredits(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setBridgeAndFactory(_bridge: PromiseOrValue<string>, _factory: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setDeltaParam(_poolId: PromiseOrValue<BigNumberish>, _batched: PromiseOrValue<boolean>, _swapDeltaBP: PromiseOrValue<BigNumberish>, _lpDeltaBP: PromiseOrValue<BigNumberish>, _defaultSwapMode: PromiseOrValue<boolean>, _defaultLPMode: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setFeeLibrary(_poolId: PromiseOrValue<BigNumberish>, _feeLibraryAddr: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setFees(_poolId: PromiseOrValue<BigNumberish>, _mintFeeBP: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setMintFeeOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setProtocolFeeOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setSwapStop(_poolId: PromiseOrValue<BigNumberish>, _swapStop: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setWeightForChainPath(_poolId: PromiseOrValue<BigNumberish>, _dstChainId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _weight: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    swap(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, _amountLD: PromiseOrValue<BigNumberish>, _minAmountLD: PromiseOrValue<BigNumberish>, _lzTxParams: Router.LzTxObjStruct, _to: PromiseOrValue<BytesLike>, _payload: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    swapRemote(_srcChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _dstGasForCall: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, _s: Pool$2.SwapObjStruct, _payload: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    withdrawMintFee(_poolId: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    withdrawProtocolFee(_poolId: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        activateChainPath(_poolId: PromiseOrValue<BigNumberish>, _dstChainId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        addLiquidity(_poolId: PromiseOrValue<BigNumberish>, _amountLD: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        bridge(overrides?: CallOverrides): Promise<string>;
        cachedSwapLookup(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BytesLike>, arg2: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            string,
            BigNumber,
            string,
            string
        ] & {
            token: string;
            amountLD: BigNumber;
            to: string;
            payload: string;
        }>;
        callDelta(_poolId: PromiseOrValue<BigNumberish>, _fullMode: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        clearCachedSwap(_dstChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        createChainPath(_poolId: PromiseOrValue<BigNumberish>, _dstChainId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _weight: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        createPool(_poolId: PromiseOrValue<BigNumberish>, _token: PromiseOrValue<string>, _sharedDecimals: PromiseOrValue<BigNumberish>, _localDecimals: PromiseOrValue<BigNumberish>, _name: PromiseOrValue<string>, _symbol: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
        creditChainPath(_dstChainId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _c: Pool$2.CreditObjStruct, overrides?: CallOverrides): Promise<void>;
        factory(overrides?: CallOverrides): Promise<string>;
        instantRedeemLocal(_srcPoolId: PromiseOrValue<BigNumberish>, _amountLP: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        mintFeeOwner(overrides?: CallOverrides): Promise<string>;
        owner(overrides?: CallOverrides): Promise<string>;
        protocolFeeOwner(overrides?: CallOverrides): Promise<string>;
        quoteLayerZeroFee(_dstChainId: PromiseOrValue<BigNumberish>, _functionType: PromiseOrValue<BigNumberish>, _toAddress: PromiseOrValue<BytesLike>, _transferAndCallPayload: PromiseOrValue<BytesLike>, _lzTxParams: Router.LzTxObjStruct, overrides?: CallOverrides): Promise<[BigNumber, BigNumber]>;
        redeemLocal(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, _amountLP: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<BytesLike>, _lzTxParams: Router.LzTxObjStruct, overrides?: CallOverrides): Promise<void>;
        redeemLocalCallback(_srcChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, _amountSD: PromiseOrValue<BigNumberish>, _mintAmountSD: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        redeemLocalCheckOnRemote(_srcChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _amountSD: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        redeemRemote(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, _amountLP: PromiseOrValue<BigNumberish>, _minAmountLD: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<BytesLike>, _lzTxParams: Router.LzTxObjStruct, overrides?: CallOverrides): Promise<void>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        retryRevert(_dstChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        revertLookup(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BytesLike>, arg2: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        revertRedeemLocal(_dstChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, _lzTxParams: Router.LzTxObjStruct, overrides?: CallOverrides): Promise<void>;
        sendCredits(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setBridgeAndFactory(_bridge: PromiseOrValue<string>, _factory: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setDeltaParam(_poolId: PromiseOrValue<BigNumberish>, _batched: PromiseOrValue<boolean>, _swapDeltaBP: PromiseOrValue<BigNumberish>, _lpDeltaBP: PromiseOrValue<BigNumberish>, _defaultSwapMode: PromiseOrValue<boolean>, _defaultLPMode: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        setFeeLibrary(_poolId: PromiseOrValue<BigNumberish>, _feeLibraryAddr: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setFees(_poolId: PromiseOrValue<BigNumberish>, _mintFeeBP: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        setMintFeeOwner(_owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setProtocolFeeOwner(_owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setSwapStop(_poolId: PromiseOrValue<BigNumberish>, _swapStop: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        setWeightForChainPath(_poolId: PromiseOrValue<BigNumberish>, _dstChainId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _weight: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        swap(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, _amountLD: PromiseOrValue<BigNumberish>, _minAmountLD: PromiseOrValue<BigNumberish>, _lzTxParams: Router.LzTxObjStruct, _to: PromiseOrValue<BytesLike>, _payload: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        swapRemote(_srcChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _dstGasForCall: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, _s: Pool$2.SwapObjStruct, _payload: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        withdrawMintFee(_poolId: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        withdrawProtocolFee(_poolId: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "CachedSwapSaved(uint16,bytes,uint256,address,uint256,address,bytes)"(chainId?: null, srcAddress?: null, nonce?: null, token?: null, amountLD?: null, to?: null, payload?: null): CachedSwapSavedEventFilter;
        CachedSwapSaved(chainId?: null, srcAddress?: null, nonce?: null, token?: null, amountLD?: null, to?: null, payload?: null): CachedSwapSavedEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter$1;
        OwnershipTransferred(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter$1;
        "ReceiveFailed(uint16,bytes,uint256,address,uint256,bytes,string)"(chainId?: null, srcAddress?: null, nonce?: null, token?: null, amountLD?: null, payload?: null, reason?: null): ReceiveFailedEventFilter;
        ReceiveFailed(chainId?: null, srcAddress?: null, nonce?: null, token?: null, amountLD?: null, payload?: null, reason?: null): ReceiveFailedEventFilter;
        "Revert(uint8,uint16,bytes,uint256)"(bridgeFunctionType?: null, chainId?: null, srcAddress?: null, nonce?: null): RevertEventFilter;
        Revert(bridgeFunctionType?: null, chainId?: null, srcAddress?: null, nonce?: null): RevertEventFilter;
    };
    estimateGas: {
        activateChainPath(_poolId: PromiseOrValue<BigNumberish>, _dstChainId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        addLiquidity(_poolId: PromiseOrValue<BigNumberish>, _amountLD: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        bridge(overrides?: CallOverrides): Promise<BigNumber>;
        cachedSwapLookup(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BytesLike>, arg2: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        callDelta(_poolId: PromiseOrValue<BigNumberish>, _fullMode: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        clearCachedSwap(_dstChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        createChainPath(_poolId: PromiseOrValue<BigNumberish>, _dstChainId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _weight: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        createPool(_poolId: PromiseOrValue<BigNumberish>, _token: PromiseOrValue<string>, _sharedDecimals: PromiseOrValue<BigNumberish>, _localDecimals: PromiseOrValue<BigNumberish>, _name: PromiseOrValue<string>, _symbol: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        creditChainPath(_dstChainId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _c: Pool$2.CreditObjStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        factory(overrides?: CallOverrides): Promise<BigNumber>;
        instantRedeemLocal(_srcPoolId: PromiseOrValue<BigNumberish>, _amountLP: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        mintFeeOwner(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        protocolFeeOwner(overrides?: CallOverrides): Promise<BigNumber>;
        quoteLayerZeroFee(_dstChainId: PromiseOrValue<BigNumberish>, _functionType: PromiseOrValue<BigNumberish>, _toAddress: PromiseOrValue<BytesLike>, _transferAndCallPayload: PromiseOrValue<BytesLike>, _lzTxParams: Router.LzTxObjStruct, overrides?: CallOverrides): Promise<BigNumber>;
        redeemLocal(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, _amountLP: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<BytesLike>, _lzTxParams: Router.LzTxObjStruct, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        redeemLocalCallback(_srcChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, _amountSD: PromiseOrValue<BigNumberish>, _mintAmountSD: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        redeemLocalCheckOnRemote(_srcChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _amountSD: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        redeemRemote(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, _amountLP: PromiseOrValue<BigNumberish>, _minAmountLD: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<BytesLike>, _lzTxParams: Router.LzTxObjStruct, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        retryRevert(_dstChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        revertLookup(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BytesLike>, arg2: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        revertRedeemLocal(_dstChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, _lzTxParams: Router.LzTxObjStruct, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        sendCredits(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setBridgeAndFactory(_bridge: PromiseOrValue<string>, _factory: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setDeltaParam(_poolId: PromiseOrValue<BigNumberish>, _batched: PromiseOrValue<boolean>, _swapDeltaBP: PromiseOrValue<BigNumberish>, _lpDeltaBP: PromiseOrValue<BigNumberish>, _defaultSwapMode: PromiseOrValue<boolean>, _defaultLPMode: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setFeeLibrary(_poolId: PromiseOrValue<BigNumberish>, _feeLibraryAddr: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setFees(_poolId: PromiseOrValue<BigNumberish>, _mintFeeBP: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setMintFeeOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setProtocolFeeOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setSwapStop(_poolId: PromiseOrValue<BigNumberish>, _swapStop: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setWeightForChainPath(_poolId: PromiseOrValue<BigNumberish>, _dstChainId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _weight: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        swap(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, _amountLD: PromiseOrValue<BigNumberish>, _minAmountLD: PromiseOrValue<BigNumberish>, _lzTxParams: Router.LzTxObjStruct, _to: PromiseOrValue<BytesLike>, _payload: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        swapRemote(_srcChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _dstGasForCall: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, _s: Pool$2.SwapObjStruct, _payload: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        withdrawMintFee(_poolId: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        withdrawProtocolFee(_poolId: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        activateChainPath(_poolId: PromiseOrValue<BigNumberish>, _dstChainId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        addLiquidity(_poolId: PromiseOrValue<BigNumberish>, _amountLD: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        bridge(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        cachedSwapLookup(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BytesLike>, arg2: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        callDelta(_poolId: PromiseOrValue<BigNumberish>, _fullMode: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        clearCachedSwap(_dstChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        createChainPath(_poolId: PromiseOrValue<BigNumberish>, _dstChainId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _weight: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        createPool(_poolId: PromiseOrValue<BigNumberish>, _token: PromiseOrValue<string>, _sharedDecimals: PromiseOrValue<BigNumberish>, _localDecimals: PromiseOrValue<BigNumberish>, _name: PromiseOrValue<string>, _symbol: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        creditChainPath(_dstChainId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _c: Pool$2.CreditObjStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        factory(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        instantRedeemLocal(_srcPoolId: PromiseOrValue<BigNumberish>, _amountLP: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        mintFeeOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        protocolFeeOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        quoteLayerZeroFee(_dstChainId: PromiseOrValue<BigNumberish>, _functionType: PromiseOrValue<BigNumberish>, _toAddress: PromiseOrValue<BytesLike>, _transferAndCallPayload: PromiseOrValue<BytesLike>, _lzTxParams: Router.LzTxObjStruct, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        redeemLocal(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, _amountLP: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<BytesLike>, _lzTxParams: Router.LzTxObjStruct, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        redeemLocalCallback(_srcChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, _amountSD: PromiseOrValue<BigNumberish>, _mintAmountSD: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        redeemLocalCheckOnRemote(_srcChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _amountSD: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        redeemRemote(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, _amountLP: PromiseOrValue<BigNumberish>, _minAmountLD: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<BytesLike>, _lzTxParams: Router.LzTxObjStruct, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        retryRevert(_dstChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        revertLookup(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BytesLike>, arg2: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        revertRedeemLocal(_dstChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, _lzTxParams: Router.LzTxObjStruct, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        sendCredits(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setBridgeAndFactory(_bridge: PromiseOrValue<string>, _factory: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setDeltaParam(_poolId: PromiseOrValue<BigNumberish>, _batched: PromiseOrValue<boolean>, _swapDeltaBP: PromiseOrValue<BigNumberish>, _lpDeltaBP: PromiseOrValue<BigNumberish>, _defaultSwapMode: PromiseOrValue<boolean>, _defaultLPMode: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setFeeLibrary(_poolId: PromiseOrValue<BigNumberish>, _feeLibraryAddr: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setFees(_poolId: PromiseOrValue<BigNumberish>, _mintFeeBP: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setMintFeeOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setProtocolFeeOwner(_owner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setSwapStop(_poolId: PromiseOrValue<BigNumberish>, _swapStop: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setWeightForChainPath(_poolId: PromiseOrValue<BigNumberish>, _dstChainId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _weight: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        swap(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _refundAddress: PromiseOrValue<string>, _amountLD: PromiseOrValue<BigNumberish>, _minAmountLD: PromiseOrValue<BigNumberish>, _lzTxParams: Router.LzTxObjStruct, _to: PromiseOrValue<BytesLike>, _payload: PromiseOrValue<BytesLike>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        swapRemote(_srcChainId: PromiseOrValue<BigNumberish>, _srcAddress: PromiseOrValue<BytesLike>, _nonce: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _dstGasForCall: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, _s: Pool$2.SwapObjStruct, _payload: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        withdrawMintFee(_poolId: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        withdrawProtocolFee(_poolId: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}

declare namespace Pool$1 {
    type SwapObjStruct = {
        amount: PromiseOrValue<BigNumberish>;
        eqFee: PromiseOrValue<BigNumberish>;
        eqReward: PromiseOrValue<BigNumberish>;
        lpFee: PromiseOrValue<BigNumberish>;
        protocolFee: PromiseOrValue<BigNumberish>;
        lkbRemove: PromiseOrValue<BigNumberish>;
    };
    type SwapObjStructOutput = [
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
interface StargateFeeLibraryInterface extends utils.Interface {
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
    getFunction(nameOrSignatureOrTopic: "BP_DENOMINATOR" | "VERSION" | "eqFeeBP" | "eqRewardBP" | "factory" | "getFees" | "lpFeeBP" | "owner" | "protocolFeeBP" | "renounceOwnership" | "setFees" | "transferOwnership"): FunctionFragment;
    encodeFunctionData(functionFragment: "BP_DENOMINATOR", values?: undefined): string;
    encodeFunctionData(functionFragment: "VERSION", values?: undefined): string;
    encodeFunctionData(functionFragment: "eqFeeBP", values?: undefined): string;
    encodeFunctionData(functionFragment: "eqRewardBP", values?: undefined): string;
    encodeFunctionData(functionFragment: "factory", values?: undefined): string;
    encodeFunctionData(functionFragment: "getFees", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "lpFeeBP", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "protocolFeeBP", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "setFees", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "BP_DENOMINATOR", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "VERSION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "eqFeeBP", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "eqRewardBP", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getFees", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lpFeeBP", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "protocolFeeBP", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setFees", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    events: {
        "FeesUpdated(uint256,uint256)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "FeesUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}
interface FeesUpdatedEventObject {
    lpFeeBP: BigNumber;
    protocolFeeBP: BigNumber;
}
type FeesUpdatedEvent = TypedEvent<[
    BigNumber,
    BigNumber
], FeesUpdatedEventObject>;
type FeesUpdatedEventFilter = TypedEventFilter<FeesUpdatedEvent>;
interface OwnershipTransferredEventObject {
    previousOwner: string;
    newOwner: string;
}
type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], OwnershipTransferredEventObject>;
type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
interface StargateFeeLibrary extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: StargateFeeLibraryInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
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
        getFees(_srcPoolId: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<string>, _amountSD: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[Pool$1.SwapObjStructOutput] & {
            s: Pool$1.SwapObjStructOutput;
        }>;
        lpFeeBP(overrides?: CallOverrides): Promise<[BigNumber]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        protocolFeeBP(overrides?: CallOverrides): Promise<[BigNumber]>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setFees(_lpFeeBP: PromiseOrValue<BigNumberish>, _protocolFeeBP: PromiseOrValue<BigNumberish>, _eqFeeBP: PromiseOrValue<BigNumberish>, _eqRewardBP: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    BP_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;
    VERSION(overrides?: CallOverrides): Promise<string>;
    eqFeeBP(overrides?: CallOverrides): Promise<BigNumber>;
    eqRewardBP(overrides?: CallOverrides): Promise<BigNumber>;
    factory(overrides?: CallOverrides): Promise<string>;
    getFees(_srcPoolId: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<string>, _amountSD: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<Pool$1.SwapObjStructOutput>;
    lpFeeBP(overrides?: CallOverrides): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<string>;
    protocolFeeBP(overrides?: CallOverrides): Promise<BigNumber>;
    renounceOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setFees(_lpFeeBP: PromiseOrValue<BigNumberish>, _protocolFeeBP: PromiseOrValue<BigNumberish>, _eqFeeBP: PromiseOrValue<BigNumberish>, _eqRewardBP: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        BP_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;
        VERSION(overrides?: CallOverrides): Promise<string>;
        eqFeeBP(overrides?: CallOverrides): Promise<BigNumber>;
        eqRewardBP(overrides?: CallOverrides): Promise<BigNumber>;
        factory(overrides?: CallOverrides): Promise<string>;
        getFees(_srcPoolId: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<string>, _amountSD: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<Pool$1.SwapObjStructOutput>;
        lpFeeBP(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<string>;
        protocolFeeBP(overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        setFees(_lpFeeBP: PromiseOrValue<BigNumberish>, _protocolFeeBP: PromiseOrValue<BigNumberish>, _eqFeeBP: PromiseOrValue<BigNumberish>, _eqRewardBP: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "FeesUpdated(uint256,uint256)"(lpFeeBP?: null, protocolFeeBP?: null): FeesUpdatedEventFilter;
        FeesUpdated(lpFeeBP?: null, protocolFeeBP?: null): FeesUpdatedEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
    };
    estimateGas: {
        BP_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;
        VERSION(overrides?: CallOverrides): Promise<BigNumber>;
        eqFeeBP(overrides?: CallOverrides): Promise<BigNumber>;
        eqRewardBP(overrides?: CallOverrides): Promise<BigNumber>;
        factory(overrides?: CallOverrides): Promise<BigNumber>;
        getFees(_srcPoolId: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<string>, _amountSD: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        lpFeeBP(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        protocolFeeBP(overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setFees(_lpFeeBP: PromiseOrValue<BigNumberish>, _protocolFeeBP: PromiseOrValue<BigNumberish>, _eqFeeBP: PromiseOrValue<BigNumberish>, _eqRewardBP: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        BP_DENOMINATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        VERSION(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        eqFeeBP(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        eqRewardBP(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        factory(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getFees(_srcPoolId: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<string>, _amountSD: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        lpFeeBP(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        protocolFeeBP(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setFees(_lpFeeBP: PromiseOrValue<BigNumberish>, _protocolFeeBP: PromiseOrValue<BigNumberish>, _eqFeeBP: PromiseOrValue<BigNumberish>, _eqRewardBP: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}

declare namespace IStargateWidget {
    type FeeObjStruct = {
        tenthBps: PromiseOrValue<BigNumberish>;
        feeCollector: PromiseOrValue<string>;
    };
    type FeeObjStructOutput = [BigNumber, string] & {
        tenthBps: BigNumber;
        feeCollector: string;
    };
}
declare namespace IStargateRouter {
    type LzTxObjStruct = {
        dstGasForCall: PromiseOrValue<BigNumberish>;
        dstNativeAmount: PromiseOrValue<BigNumberish>;
        dstNativeAddr: PromiseOrValue<BytesLike>;
    };
    type LzTxObjStructOutput = [BigNumber, BigNumber, string] & {
        dstGasForCall: BigNumber;
        dstNativeAmount: BigNumber;
        dstNativeAddr: string;
    };
}
interface StargateWidgetInterface extends utils.Interface {
    functions: {
        "MAX_UINT()": FunctionFragment;
        "TENTH_BPS_DENOMINATOR()": FunctionFragment;
        "partnerSwap(bytes2)": FunctionFragment;
        "stargateFactory()": FunctionFragment;
        "stargateRouter()": FunctionFragment;
        "stargateRouterETH()": FunctionFragment;
        "swapETH(uint16,uint256,uint256,bytes,bytes2,(uint256,address))": FunctionFragment;
        "swapTokens(uint16,uint16,uint16,uint256,uint256,(uint256,uint256,bytes),bytes,bytes2,(uint256,address))": FunctionFragment;
        "tokenApproved(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "MAX_UINT" | "TENTH_BPS_DENOMINATOR" | "partnerSwap" | "stargateFactory" | "stargateRouter" | "stargateRouterETH" | "swapETH" | "swapTokens" | "tokenApproved"): FunctionFragment;
    encodeFunctionData(functionFragment: "MAX_UINT", values?: undefined): string;
    encodeFunctionData(functionFragment: "TENTH_BPS_DENOMINATOR", values?: undefined): string;
    encodeFunctionData(functionFragment: "partnerSwap", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "stargateFactory", values?: undefined): string;
    encodeFunctionData(functionFragment: "stargateRouter", values?: undefined): string;
    encodeFunctionData(functionFragment: "stargateRouterETH", values?: undefined): string;
    encodeFunctionData(functionFragment: "swapETH", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        IStargateWidget.FeeObjStruct
    ]): string;
    encodeFunctionData(functionFragment: "swapTokens", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        IStargateRouter.LzTxObjStruct,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BytesLike>,
        IStargateWidget.FeeObjStruct
    ]): string;
    encodeFunctionData(functionFragment: "tokenApproved", values: [PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "MAX_UINT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "TENTH_BPS_DENOMINATOR", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "partnerSwap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "stargateFactory", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "stargateRouter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "stargateRouterETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "swapETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "swapTokens", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenApproved", data: BytesLike): Result;
    events: {
        "PartnerSwap(bytes2)": EventFragment;
        "WidgetSwapped(bytes2,uint256,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "PartnerSwap"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "WidgetSwapped"): EventFragment;
}
interface PartnerSwapEventObject {
    partnerId: string;
}
type PartnerSwapEvent = TypedEvent<[string], PartnerSwapEventObject>;
type PartnerSwapEventFilter = TypedEventFilter<PartnerSwapEvent>;
interface WidgetSwappedEventObject {
    partnerId: string;
    tenthBps: BigNumber;
    widgetFee: BigNumber;
}
type WidgetSwappedEvent = TypedEvent<[
    string,
    BigNumber,
    BigNumber
], WidgetSwappedEventObject>;
type WidgetSwappedEventFilter = TypedEventFilter<WidgetSwappedEvent>;
interface StargateWidget extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: StargateWidgetInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        MAX_UINT(overrides?: CallOverrides): Promise<[BigNumber]>;
        TENTH_BPS_DENOMINATOR(overrides?: CallOverrides): Promise<[BigNumber]>;
        partnerSwap(_partnerId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        stargateFactory(overrides?: CallOverrides): Promise<[string]>;
        stargateRouter(overrides?: CallOverrides): Promise<[string]>;
        stargateRouterETH(overrides?: CallOverrides): Promise<[string]>;
        swapETH(_dstChainId: PromiseOrValue<BigNumberish>, _amountLD: PromiseOrValue<BigNumberish>, _minAmountLD: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<BytesLike>, _partnerId: PromiseOrValue<BytesLike>, _feeObj: IStargateWidget.FeeObjStruct, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        swapTokens(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _amountLD: PromiseOrValue<BigNumberish>, _minAmountLD: PromiseOrValue<BigNumberish>, _lzTxParams: IStargateRouter.LzTxObjStruct, _to: PromiseOrValue<BytesLike>, _partnerId: PromiseOrValue<BytesLike>, _feeObj: IStargateWidget.FeeObjStruct, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        tokenApproved(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
    };
    MAX_UINT(overrides?: CallOverrides): Promise<BigNumber>;
    TENTH_BPS_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;
    partnerSwap(_partnerId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    stargateFactory(overrides?: CallOverrides): Promise<string>;
    stargateRouter(overrides?: CallOverrides): Promise<string>;
    stargateRouterETH(overrides?: CallOverrides): Promise<string>;
    swapETH(_dstChainId: PromiseOrValue<BigNumberish>, _amountLD: PromiseOrValue<BigNumberish>, _minAmountLD: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<BytesLike>, _partnerId: PromiseOrValue<BytesLike>, _feeObj: IStargateWidget.FeeObjStruct, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    swapTokens(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _amountLD: PromiseOrValue<BigNumberish>, _minAmountLD: PromiseOrValue<BigNumberish>, _lzTxParams: IStargateRouter.LzTxObjStruct, _to: PromiseOrValue<BytesLike>, _partnerId: PromiseOrValue<BytesLike>, _feeObj: IStargateWidget.FeeObjStruct, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    tokenApproved(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        MAX_UINT(overrides?: CallOverrides): Promise<BigNumber>;
        TENTH_BPS_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;
        partnerSwap(_partnerId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        stargateFactory(overrides?: CallOverrides): Promise<string>;
        stargateRouter(overrides?: CallOverrides): Promise<string>;
        stargateRouterETH(overrides?: CallOverrides): Promise<string>;
        swapETH(_dstChainId: PromiseOrValue<BigNumberish>, _amountLD: PromiseOrValue<BigNumberish>, _minAmountLD: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<BytesLike>, _partnerId: PromiseOrValue<BytesLike>, _feeObj: IStargateWidget.FeeObjStruct, overrides?: CallOverrides): Promise<void>;
        swapTokens(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _amountLD: PromiseOrValue<BigNumberish>, _minAmountLD: PromiseOrValue<BigNumberish>, _lzTxParams: IStargateRouter.LzTxObjStruct, _to: PromiseOrValue<BytesLike>, _partnerId: PromiseOrValue<BytesLike>, _feeObj: IStargateWidget.FeeObjStruct, overrides?: CallOverrides): Promise<void>;
        tokenApproved(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "PartnerSwap(bytes2)"(partnerId?: PromiseOrValue<BytesLike> | null): PartnerSwapEventFilter;
        PartnerSwap(partnerId?: PromiseOrValue<BytesLike> | null): PartnerSwapEventFilter;
        "WidgetSwapped(bytes2,uint256,uint256)"(partnerId?: PromiseOrValue<BytesLike> | null, tenthBps?: null, widgetFee?: null): WidgetSwappedEventFilter;
        WidgetSwapped(partnerId?: PromiseOrValue<BytesLike> | null, tenthBps?: null, widgetFee?: null): WidgetSwappedEventFilter;
    };
    estimateGas: {
        MAX_UINT(overrides?: CallOverrides): Promise<BigNumber>;
        TENTH_BPS_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;
        partnerSwap(_partnerId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        stargateFactory(overrides?: CallOverrides): Promise<BigNumber>;
        stargateRouter(overrides?: CallOverrides): Promise<BigNumber>;
        stargateRouterETH(overrides?: CallOverrides): Promise<BigNumber>;
        swapETH(_dstChainId: PromiseOrValue<BigNumberish>, _amountLD: PromiseOrValue<BigNumberish>, _minAmountLD: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<BytesLike>, _partnerId: PromiseOrValue<BytesLike>, _feeObj: IStargateWidget.FeeObjStruct, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        swapTokens(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _amountLD: PromiseOrValue<BigNumberish>, _minAmountLD: PromiseOrValue<BigNumberish>, _lzTxParams: IStargateRouter.LzTxObjStruct, _to: PromiseOrValue<BytesLike>, _partnerId: PromiseOrValue<BytesLike>, _feeObj: IStargateWidget.FeeObjStruct, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        tokenApproved(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        MAX_UINT(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        TENTH_BPS_DENOMINATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        partnerSwap(_partnerId: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        stargateFactory(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        stargateRouter(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        stargateRouterETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        swapETH(_dstChainId: PromiseOrValue<BigNumberish>, _amountLD: PromiseOrValue<BigNumberish>, _minAmountLD: PromiseOrValue<BigNumberish>, _to: PromiseOrValue<BytesLike>, _partnerId: PromiseOrValue<BytesLike>, _feeObj: IStargateWidget.FeeObjStruct, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        swapTokens(_dstChainId: PromiseOrValue<BigNumberish>, _srcPoolId: PromiseOrValue<BigNumberish>, _dstPoolId: PromiseOrValue<BigNumberish>, _amountLD: PromiseOrValue<BigNumberish>, _minAmountLD: PromiseOrValue<BigNumberish>, _lzTxParams: IStargateRouter.LzTxObjStruct, _to: PromiseOrValue<BytesLike>, _partnerId: PromiseOrValue<BytesLike>, _feeObj: IStargateWidget.FeeObjStruct, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        tokenApproved(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}

type FarmType = 'LPStaking' | 'LPStakingTime';
type Pool = {
    chainId: ChainId;
    poolId: number;
    lpToken: Token;
    token: Token;
    currency: Currency;
};
type Farm = {
    chainId: ChainId;
    pid: number;
    type: FarmType;
    address: string;
    lpToken: Token;
    rewardToken: Token;
};
type TokenLike = Pick<Token, 'address' | 'chainId' | 'symbol' | 'name' | 'decimals'>;
type PoolLike$1 = {
    chainId: ChainId;
    poolId: number;
    lpToken: TokenLike;
    token: TokenLike;
    sharedDecimals: number;
};
type FarmLike = {
    chainId: ChainId;
    pid: number;
    type: FarmType;
    address: string;
    lpToken: TokenLike;
    rewardToken: TokenLike;
};
type Path = {
    srcPool: Pool;
    dstPool: Pool;
};
type StargateConfig = {
    pools: Pool[];
    farms: Farm[];
    router: Record<number, string>;
    routerEth: Record<number, string>;
    ofts: OftBridgeConfig[];
    disabled: {
        srcChainId?: number;
        dstChainId?: number;
        srcPoolId?: number;
        dstPoolId?: number;
    }[];
};
type OftProxyConfig = {
    chainId: ChainId;
    address: string;
};
type OftVersion = 0 | 1 | 2;
type OftBridgeConfig = {
    proxy: OftProxyConfig[];
    version: OftVersion;
    tokens: Token[];
    fee: boolean;
    sharedDecimals?: number;
};
type OftBridgeConfigLike = {
    tokens: TokenLike[];
} & Omit<OftBridgeConfig, 'tokens'>;
type StargateConfigLike = {
    pools: PoolLike$1[];
    farms?: FarmLike[];
    ofts?: OftBridgeConfigLike[];
    router?: StargateConfig['router'];
    routerEth?: StargateConfig['router'];
    disabled?: StargateConfig['disabled'];
};

declare class StargateSDK {
    private config;
    private swapGroups;
    constructor(config?: StargateConfig);
    tryGetPoolByPoolId: (poolId?: number, chainId?: number) => Pool | undefined;
    getPoolByPoolId: (poolId: number, chainId: number) => Pool;
    getAllChainPaths: () => Path[];
    getAllPools: () => Pool[];
    getAllFarms: () => Farm[];
    private isValidPath;
    tryGetPath: (srcCurrency?: Currency, dstCurrency?: Currency) => {
        srcPool: Pool;
        dstPool: Pool;
    } | undefined;
    getPath: (srcCurrency: Currency, dstCurrency: Currency) => {
        srcPool: Pool;
        dstPool: Pool;
    };
    tryGetRouterAddress(chainId: number): string;
    getRouterAddress: (chainId: number) => string;
    tryGetRouterEthAddress(chainId: number): string;
    getRouterEthAddress: (chainId: number) => string;
    isDisabledPath(srcPool: PoolLike, dstPool: PoolLike): boolean;
}
type PoolLike = {
    chainId: number;
    poolId: number;
};

type StargateFee = {
    totalFee: CurrencyAmount;
    eqFee: CurrencyAmount;
    eqReward: CurrencyAmount;
    lpFee: CurrencyAmount;
    protocolFee: CurrencyAmount;
    lkbRemove: CurrencyAmount;
};
declare class StargateBridge__evm implements BridgeApi<Signer, StargateFee> {
    protected readonly providerFactory: ProviderFactory;
    readonly sdk: StargateSDK;
    protected feeLibraryCache: Map<string, StargateFeeLibrary>;
    protected readonly erc20: ERC20__api;
    constructor(providerFactory: ProviderFactory, sdk: StargateSDK);
    getAllowance(currency: Currency, address: string): Promise<CurrencyAmount>;
    approve(amount: CurrencyAmount): Promise<Transaction<Signer>>;
    supportsTransfer(srcCurrency: Currency, dstCurrency: Currency): boolean;
    supportsClaim(currency: Currency): boolean;
    supportsRegister(currency: Currency): boolean;
    isRegistered(currency: Currency, address: string): Promise<boolean>;
    getUnclaimed(currency: Currency, address: string): Promise<CurrencyAmount<Currency>>;
    claim(currency: Currency): Promise<Transaction<Signer>>;
    register(currency: Currency): Promise<Transaction<Signer>>;
    transfer(input: TransferInput): Promise<Transaction<Signer>>;
    protected transferEth(input: TransferInput): Promise<Transaction<Signer>>;
    protected transferToken(input: TransferInput): Promise<Transaction<Signer>>;
    getMessageFee(srcCurrency: Currency, dstCurrency: Currency, adapterParams: AdapterParams): Promise<FeeQuote>;
    protected lzTxParams(adapterParams: AdapterParams): Router.LzTxObjStruct;
    protected getFeeLibraryAddress: (lpToken: Token) => Promise<string>;
    protected getFeeLibrary(lpToken: Token): Promise<StargateFeeLibrary>;
    getOutput(inputAmountLD: CurrencyAmount<Currency>, dstCurrency: Currency): Promise<{
        amount: CurrencyAmount;
        fee: StargateFee;
    }>;
    getLimit(srcCurrency: Currency, dstCurrency: Currency): Promise<CurrencyAmount<Currency>>;
    getExtraGas(srcCurrency: Currency, dstCurrency: Currency): Promise<number>;
    getDuration(srcCurrency: Currency, dstCurrency: Currency): Promise<number>;
}

type PartnerConfig = {
    partnerId: number;
    tenthBps: number;
    feeCollector: string;
};
type StargateWidgetFee = {
    totalFee: CurrencyAmount;
    eqFee: CurrencyAmount;
    eqReward: CurrencyAmount;
    lpFee: CurrencyAmount;
    protocolFee: CurrencyAmount;
    lkbRemove: CurrencyAmount;
    partnerFee: CurrencyAmount;
};
declare class StargateWidgetBridge__evm extends StargateBridge__evm implements BridgeApi<Signer, StargateWidgetFee> {
    protected partnerConfig: PartnerConfig;
    private readonly tenthBpsDenominator;
    constructor(providerFactory: ProviderFactory, sdk: StargateSDK, partnerConfig: PartnerConfig);
    private getPartnerFee;
    getAllowance(currency: Currency, address: string): Promise<CurrencyAmount>;
    approve(amount: CurrencyAmount): Promise<Transaction<Signer>>;
    getOutput(inputAmountLD: CurrencyAmount<Currency>, dstCurrency: Currency): Promise<{
        amount: CurrencyAmount;
        fee: StargateWidgetFee;
    }>;
    protected transferEth(input: TransferInput): Promise<Transaction<Signer>>;
    get feeObj(): IStargateWidget.FeeObjStruct;
    getMessageFee(srcCurrency: Currency, dstCurrency: Currency, adapterParams: AdapterParams): Promise<FeeQuote>;
    protected transferToken(input: TransferInput): Promise<Transaction<Signer>>;
    getWidgetContract(chainId: ChainId): StargateWidget;
}

declare function toConfig(input: StargateConfigLike): StargateConfig;

export { StargateBridge__evm, StargateConfig, StargateConfigLike, StargateSDK, StargateWidgetBridge__evm, mainnet, toConfig };
