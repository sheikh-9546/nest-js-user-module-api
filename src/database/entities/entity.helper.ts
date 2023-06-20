export const ExcludeAttributesFromEntity = ['dataValues', '_', 'uniqno', 'isNewRecord'];
export const ExcludeAttributesFromWithoutAuditEntity = [
    'dataValues',
    '_',
    'uniqno',
    'isNewRecord',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'createdBy',
    'updatedBy',
];

export const ExcludeColumn = {
    exclude: ['deletedAt', 'createdBy', 'updatedBy'],
};

export const AuditExcludeColumn = {
    exclude: ['createdAt', 'updatedAt', 'deletedAt', 'createdBy', 'updatedBy'],
};
