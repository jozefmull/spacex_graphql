/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query getLaunches($limit: Int!, $offset: Int!) {\n    launchesPast(limit: $limit, offset: $offset) {\n      details\n      id\n      launch_date_utc\n      rocket {\n        rocket_name\n      }\n      launch_site {\n        site_name\n      }\n      launch_success\n      mission_id\n      mission_name\n    }}\n": types.GetLaunchesDocument,
    "\n  query getLaunchDetails($id: ID!){\n    launch(id: $id) {\n      id\n      details\n      launch_date_utc\n      launch_success\n      launch_site {\n        site_name_long\n      }\n      rocket {\n        rocket_name\n      }\n      links {\n        video_link\n        wikipedia\n      }\n      mission_name\n    }\n  }\n": types.GetLaunchDetailsDocument,
};

export function graphql(source: "\n  query getLaunches($limit: Int!, $offset: Int!) {\n    launchesPast(limit: $limit, offset: $offset) {\n      details\n      id\n      launch_date_utc\n      rocket {\n        rocket_name\n      }\n      launch_site {\n        site_name\n      }\n      launch_success\n      mission_id\n      mission_name\n    }}\n"): (typeof documents)["\n  query getLaunches($limit: Int!, $offset: Int!) {\n    launchesPast(limit: $limit, offset: $offset) {\n      details\n      id\n      launch_date_utc\n      rocket {\n        rocket_name\n      }\n      launch_site {\n        site_name\n      }\n      launch_success\n      mission_id\n      mission_name\n    }}\n"];
export function graphql(source: "\n  query getLaunchDetails($id: ID!){\n    launch(id: $id) {\n      id\n      details\n      launch_date_utc\n      launch_success\n      launch_site {\n        site_name_long\n      }\n      rocket {\n        rocket_name\n      }\n      links {\n        video_link\n        wikipedia\n      }\n      mission_name\n    }\n  }\n"): (typeof documents)["\n  query getLaunchDetails($id: ID!){\n    launch(id: $id) {\n      id\n      details\n      launch_date_utc\n      launch_success\n      launch_site {\n        site_name_long\n      }\n      rocket {\n        rocket_name\n      }\n      links {\n        video_link\n        wikipedia\n      }\n      mission_name\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;