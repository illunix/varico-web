// tslint:disable
// eslint-disable
// Generated by Microsoft Kiota
import { SummaryRequestBuilder } from './summary/';
import { TransactionsRequestBuilder } from './transactions/';
import { BaseRequestBuilder, type RequestAdapter } from '@microsoft/kiota-abstractions';

/**
 * Builds and executes requests for operations under /accounts/{accountReferenceId}
 */
export class WithAccountReferenceItemRequestBuilder extends BaseRequestBuilder<WithAccountReferenceItemRequestBuilder> {
    /**
     * The summary property
     */
    public get summary(): SummaryRequestBuilder {
        return new SummaryRequestBuilder(this.pathParameters, this.requestAdapter);
    }
    /**
     * The transactions property
     */
    public get transactions(): TransactionsRequestBuilder {
        return new TransactionsRequestBuilder(this.pathParameters, this.requestAdapter);
    }
    /**
     * Instantiates a new WithAccountReferenceItemRequestBuilder and sets the default values.
     * @param pathParameters The raw url or the Url template parameters for the request.
     * @param requestAdapter The request adapter to use to execute the requests.
     */
    public constructor(pathParameters: Record<string, unknown> | string | undefined, requestAdapter: RequestAdapter) {
        super(pathParameters, requestAdapter, "{+baseurl}/accounts/{accountReferenceId}", (x, y) => new WithAccountReferenceItemRequestBuilder(x, y));
    }
}
// tslint:enable
// eslint-enable
