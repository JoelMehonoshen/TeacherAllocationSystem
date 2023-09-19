

export default class AutoAllocatorController {

    constructor(private willingWeight: number, private expertiseWeight: number, private priorWeight: number ) {
    } 

    public scoreAllocation(allocationScores: any) {
        return (this.willingWeight * allocationScores.willingness) + (this.expertiseWeight * allocationScores.expertise) 
            + (this.priorWeight * allocationScores.priorYears);
    }
}
