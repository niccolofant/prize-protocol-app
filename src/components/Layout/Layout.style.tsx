import tw from 'twin.macro'

export const OuterLayoutWrapper = tw.div`
    flex h-screen text-base tracking-wide font-gilroy
`

export const OuterHeaderWrapper = tw.div`
    flex w-screen flex-1 overflow-hidden light:bg-gray-100 dark:bg-gray-900
`

export const InnerHeaderWrapper = tw.div`
    scrollbar-hide flex-1 overflow-y-scroll
`

export const BodyWrapper = tw.div`
    mx-auto max-w-4xl p-2 sm:px-5 sm:py-10
`
