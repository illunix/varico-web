// tslint:disable
// eslint-disable
// Generated by Microsoft Kiota
import { createExceptionResponseFromDiscriminatorValue, deserializeIntoExceptionResponse, deserializeIntoUpdateTransactionCategoryCommand, serializeExceptionResponse, serializeUpdateTransactionCategoryCommand, type ExceptionResponse, type UpdateTransactionCategoryCommand } from '../../../models/';
import { BaseRequestBuilder, HttpMethod, RequestInformation, type Parsable, type ParsableFactory, type RequestAdapter, type RequestConfiguration, type RequestOption } from '@microsoft/kiota-abstractions';

/**
 * Builds and executes requests for operations under /transactions/{transactionReferenceId}/category
 */
export class CategoryRequestBuilder extends BaseRequestBuilder<CategoryRequestBuilder> {
    /**
     * Instantiates a new CategoryRequestBuilder and sets the default values.
     * @param pathParameters The raw url or the Url template parameters for the request.
     * @param requestAdapter The request adapter to use to execute the requests.
     */
    public constructor(pathParameters: Record<string, unknown> | string | undefined, requestAdapter: RequestAdapter) {
        super(pathParameters, requestAdapter, "{+baseurl}/transactions/{transactionReferenceId}/category", (x, y) => new CategoryRequestBuilder(x, y));
    }
    /**
     * @param body The request body
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     */
    public patch(body: UpdateTransactionCategoryCommand, requestConfiguration?: RequestConfiguration<object> | undefined) : Promise<void> {
        const requestInfo = this.toPatchRequestInformation(
            body, requestConfiguration
        );
        const errorMapping = {
            "400": createExceptionResponseFromDiscriminatorValue,
        } as Record<string, ParsableFactory<Parsable>>;
        return this.requestAdapter.sendNoResponseContentAsync(requestInfo, errorMapping);
    }
    /**
     * @param body The request body
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns a RequestInformation
     */
    public toPatchRequestInformation(body: UpdateTransactionCategoryCommand, requestConfiguration?: RequestConfiguration<object> | undefined) : RequestInformation {
        if(!body) throw new Error("body cannot be undefined");
        const requestInfo = new RequestInformation(HttpMethod.PATCH, this.urlTemplate, this.pathParameters);
        requestInfo.configure(requestConfiguration);
        requestInfo.headers.tryAdd("Accept", "application/json");
        requestInfo.setContentFromParsable(this.requestAdapter, "application/json", body, serializeUpdateTransactionCategoryCommand);
        return requestInfo;
    }
}
// tslint:enable
// eslint-enable