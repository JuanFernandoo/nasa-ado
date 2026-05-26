import { Suspense } from 'react'
import { PageSkeleton } from '@/shared/components/ui/PageSkeleton'

interface SuspenseWrapperProps {
  children: React.ReactNode
}

export function SuspenseWrapper({ children }: SuspenseWrapperProps) {
  return <Suspense fallback={<PageSkeleton />}>{children}</Suspense>
}