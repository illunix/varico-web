// tslint:disable
// eslint-disable
// Generated by Microsoft Kiota
import { createExceptionResponseFromDiscriminatorValue, createTransactionDtoFromDiscriminatorValue, deserializeIntoExceptionResponse, serializeExceptionResponse, type ExceptionResponse, type TransactionDto } from '../models/';
import { WithTransactionReferenceItemRequestBuilder } from './item/';
import { BaseRequestBuilder, getPathParameters, HttpMethod, RequestInformation, type Parsable, type ParsableFactory, type RequestAdapter, type RequestConfiguration, type RequestOption } from '@microsoft/kiota-abstractions';
import { type Guid } from 'guid-typescript';

export interface TransactionsRequestBuilderGetQueryParameters {
    accountReferenceId?: Guid;
    category?: string;
}
/**
 * Builds and executes requests for operations under /transactions
 */
export class TransactionsRequestBuilder extends BaseRequestBuilder<TransactionsRequestBuilder> {
    /**
     * Gets an item from the ApiSdk.transactions.item collection
     * @param transactionReferenceId Unique identifier of the item
     * @returns a WithTransactionReferenceItemRequestBuilder
     */
    public byTransactionReferenceId(transactionReferenceId: string) : WithTransactionReferenceItemRequestBuilder {
        if(!transactionReferenceId) throw new Error("transactionReferenceId cannot be undefined");
        const urlTplParams = getPathParameters(this.pathParameters);
        urlTplParams["transactionReferenceId"] = transactionReferenceId
        return new WithTransactionReferenceItemRequestBuilder(urlTplParams, this.requestAdapter);
    }
    /**
     * Instantiates a new TransactionsRequestBuilder and sets the default values.
     * @param pathParameters The raw url or the Url template parameters for the request.
     * @param requestAdapter The request adapter to use to execute the requests.
     */
    public constructor(pathParameters: Record<string, unknown> | string | undefined, requestAdapter: RequestAdapter) {
        super(pathParameters, requestAdapter, "{+baseurl}/transactions{?accountReferenceId*,category*}", (x, y) => new TransactionsRequestBuilder(x, y));
    }
    /**
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns a Promise of TransactionDto
     */
    public get(requestConfiguration?: RequestConfiguration<TransactionsRequestBuilderGetQueryParameters> | undefined) : Promise<TransactionDto[] | undefined> {
        const requestInfo = this.toGetRequestInformation(
            requestConfiguration
        );
        const errorMapping = {
            "400": createExceptionResponseFromDiscriminatorValue,
        } as Record<string, ParsableFactory<Parsable>>;
        return this.requestAdapter.sendCollectionAsync<TransactionDto>(requestInfo, createTransactionDtoFromDiscriminatorValue, errorMapping);
    }
    /**
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns a RequestInformation
     */
    public toGetRequestInformation(requestConfiguration?: RequestConfiguration<TransactionsRequestBuilderGetQueryParameters> | undefined) : RequestInformation {
        const requestInfo = new RequestInformation(HttpMethod.GET, this.urlTemplate, this.pathParameters);
        requestInfo.configure(requestConfiguration);
        requestInfo.headers.tryAdd("Accept", "application/json");
        return requestInfo;
    }
}
// tslint:enable
// eslint-enable