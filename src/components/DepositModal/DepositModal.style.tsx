import tw from 'twin.macro'

export const DepositModalOuterWrapper = tw.div`
    fixed inset-0 z-50 flex items-center justify-center overflow-y-auto 
    overflow-x-hidden outline-none focus:outline-none
`

export const DepositModalInnerWrapper = tw.div`
    relative my-6 mx-auto flex sm:w-2/3 lg:w-1/2 flex-col rounded-xl border-0 bg-white 
    py-3 shadow-xl outline-none focus:outline-none
`

export const DepositModalBackground = tw.div`
    fixed inset-0 z-40 bg-black opacity-60
`

export const DepositModalHeaderWrapper = tw.div`
    space-y-1 rounded-t border-b border-solid border-gray-200 p-5 text-center
`

export const DepositModalContentWrapper = tw.div`
    relative space-y-5 py-10 px-20 text-center
`

export const DepositModalFooterWrapper = tw.div`
    flex items-center justify-end rounded-b
`
