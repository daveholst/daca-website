import * as React from 'react'

export interface IAppProps {}

export default function Page({ params }: { params: { 'tour-id': string } }) {
  return <div className="text-white">{params['tour-id']}</div>
}
