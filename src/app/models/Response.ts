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

export interface CommitObjectModel{
  unix_timestamp: number,
  commit_message: string,
  parent_link?: SimpleLink,
  commit_link: SimpleLink,
  author_link: SimpleLink
}

export type ObjectType = 'BLOB' | 'LIST' | 'TREE' | 'COMMIT';
