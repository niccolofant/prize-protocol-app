import tw from 'twin.macro'

export const OuterLayoutWrapper = tw.div`
    flex h-screen font-gilroy text-base tracking-wide
`

export const OuterHeaderWrapper = tw.div`
    flex w-screen flex-1 overflow-hidden
`

export const InnerHeaderWrapper = tw.div`
    scrollbar-hide flex-1 overflow-y-scroll
`

export const BodyWrapper = tw.div`
    mx-auto max-w-4xl py-10
`