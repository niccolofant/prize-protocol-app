import tw from 'twin.macro'

export const OuterLayoutWrapper = tw.div`
    flex h-screen text-base tracking-wide bg-white font-gilroy
`

export const OuterHeaderWrapper = tw.div`
    flex w-screen flex-1 overflow-hidden bg-gray-100
`

export const InnerHeaderWrapper = tw.div`
    scrollbar-hide flex-1 overflow-y-scroll
`

export const BodyWrapper = tw.div`
    mx-auto max-w-4xl py-10 px-2 sm:px-5
`
