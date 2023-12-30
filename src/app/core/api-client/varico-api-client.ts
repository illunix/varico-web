import { Inject, Injectable } from "@angular/core";
import { FetchRequestAdapter } from "@microsoft/kiota-http-fetchlibrary";
import { VaricoApiClientGenerated } from "./generated/varico-api-client/varicoApiClientGenerated";
import { AnonymousAuthenticationProvider } from "@microsoft/kiota-abstractions";

@Injectable({ providedIn: 'root' })
export class VaricoApiClient extends VaricoApiClientGenerated {
    public constructor() {
        const adapter = new FetchRequestAdapter(new AnonymousAuthenticationProvider());
        adapter.baseUrl = "http://localhost:5123";

        super(adapter);
    }
}