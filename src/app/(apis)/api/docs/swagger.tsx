'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

type SwaggerProps = {
    specUrl: string;
    specObject?: string;
}

export default function SwaggerViewer({
    specUrl, specObject
}: SwaggerProps) {

    return (
        <SwaggerUI
            url={specUrl}
            spec={specObject}
            docExpansion='list'
            defaultModelsExpandDepth={-1}
        />
    )

}