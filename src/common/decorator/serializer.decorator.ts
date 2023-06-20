
import { ExcludeAttributesFromEntity, ExcludeAttributesFromWithoutAuditEntity } from '@app/database/entities/entity.helper';
import { applyDecorators, SerializeOptions } from '@nestjs/common';

export const Serializer = () =>
    applyDecorators(
        SerializeOptions({
            excludePrefixes: ExcludeAttributesFromEntity,
        }),
    );

export const SerializerWithAuditTrail = () =>
    applyDecorators(
        SerializeOptions({
            excludePrefixes: ExcludeAttributesFromWithoutAuditEntity,
        }),
    );

export const SerializerOnlyCreateOperation = () =>
    applyDecorators(
        SerializeOptions({ excludePrefixes: [...ExcludeAttributesFromEntity, 'deletedAt', 'createdBy', 'updatedBy'] }),
    );
