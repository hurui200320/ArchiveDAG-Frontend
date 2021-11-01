export interface StatusEntry {
  media_type?: string,
  raw_size: number,
  status: 'ready' | 'archived' | 'restoring' | 'notfound',
  type: ObjectType
}

export interface SimpleLink {
  name: string,
  link: string,
  type: ObjectType
}

export type ObjectType = 'BLOB' | 'LIST' | 'TREE' | 'COMMIT';
