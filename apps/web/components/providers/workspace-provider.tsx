"use client"

import { createContext, ReactNode, useContext, useMemo, useState } from "react"

export type WorkspaceContextValue = {
  workspaceId?: string
  workspaceSlug?: string
  setWorkspace: (value: { workspaceId?: string; workspaceSlug?: string }) => void
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null)

export function WorkspaceProvider({
  children,
  initialWorkspaceId,
  initialWorkspaceSlug,
}: {
  children: ReactNode
  initialWorkspaceId?: string
  initialWorkspaceSlug?: string
}) {
  const [state, setState] = useState({
    workspaceId: initialWorkspaceId,
    workspaceSlug: initialWorkspaceSlug,
  })

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      ...state,
      setWorkspace: (next) => setState((current) => ({ ...current, ...next })),
    }),
    [state],
  )

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext)
  if (!context) {
    throw new Error("useWorkspace must be used within WorkspaceProvider")
  }

  return context
}
