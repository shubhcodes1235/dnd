// src/lib/hooks/use-designs.ts
"use client"

import { useLiveQuery } from "dexie-react-hooks";
import { designsRepo } from "@/lib/db/repositories/designs.repo";
import { Design } from "@/lib/db/schemas";

export function useDesigns(person?: 'shubham' | 'khushi') {
    const designs = useLiveQuery(
        () => person ? designsRepo.getDesignsByPerson(person) : designsRepo.getAllDesigns(),
        [person]
    );

    const loading = designs === undefined;

    return {
        designs: designs || [],
        loading,
        addDesign: designsRepo.addDesign.bind(designsRepo),
        deleteDesign: designsRepo.deleteDesign.bind(designsRepo),
        updateDesign: designsRepo.updateDesign.bind(designsRepo),
        incrementHype: designsRepo.incrementHype.bind(designsRepo),
    };
}
