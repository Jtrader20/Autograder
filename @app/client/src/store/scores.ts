import { Assignment, User, UserAssignment } from "@autograder/shared";
import { acceptHMRUpdate, defineStore } from "pinia";
import { AssignmentService } from "../service/AssignmentService";
import { useUserStore } from "./user";
import { UserService } from "../service/UserService";
import { UserAssignmentService } from "../service/UserAssignmentService";

export const useScoresStore = defineStore('Scores', {
    state: () => ({
        assignmentservice: new AssignmentService(),
        userservice: new UserService(),
        userassignmentservice: new UserAssignmentService(),
        Assignments: [] as Assignment[],
        Users: [] as User[],
        UserAssignments: [] as UserAssignment[],
        Scores: [] as any,
        filtercriteria: {
            name: '',
            category: '',
            direction: '', // ASC or DESC,
            assignment: null as string | null,
            assignmentcateogory: null as string | null
        },
        isLoading: false
    }),
    getters: {
        isloading(state) {
            return state.isLoading
        },
        filteredscores(state) {
            let scores = state.Scores.filter((user: { name: string }) => {
                return user.name.toLowerCase().includes(state.filtercriteria.name.toLowerCase())
            })

            if (state.filtercriteria.category && state.filtercriteria.direction) {
                scores.sort((a, b) => {
                    const {category, direction, assignment, assignmentcateogory} = state.filtercriteria
                    const order = direction === 'ASC' ? 1 : -1

                    if (category === 'name') {
                        const lastnamecomparison = a.lastname.localeCompare(b.lastname)
                        if (lastnamecomparison !== 0) {
                            return order * lastnamecomparison
                        }
                        return order * a.firstname.localeCompare(b.firstname)
                    }

                    if (category === 'gracedays') {
                        return order * (a.gracedays - b.gracedays)
                    }

                    if (category === 'assignment') {
                        const assignmenta = a.Assignments.find((a: {assignmentid: string}) => a.assignmentid === assignment)
                        const assignmentb = b.Assignments.find((b: {assignmentid: string}) => b.assignmentid === assignment)
                        if (assignmentcateogory === 'score') {
                            const scorea = assignmenta.scoreearned
                            const scoreb = assignmentb.scoreearned

                            if (scorea === null && scoreb === null) return 0
                            if (scorea === null) return 1
                            if (scoreb === null) return -1

                            return order * (scorea - scoreb)
                        }

                        if (assignmentcateogory === 'gracedays') {
                            const gracea = (assignmenta.gracedaysearned ?? 0) - (assignmenta.gracedaysused ?? 0)
                            const graceb = (assignmentb.gracedaysearned ?? 0) - (assignmentb.gracedaysused ?? 0)

                            return order * (gracea - graceb)
                        }
                    }
                })
            }

            return scores
        },
        getgracedays: (state) => (alias: string): number => {
            const user = state.Scores.find((user: { alias: string}) => user.alias === alias)
            return user ? user.gracedays : 0
        }
    },
    actions: {
        setSort(category: string, direction: string, assignment: null | string, assignmentcateogory: null | string) {
            this.filtercriteria.category = category
            this.filtercriteria.direction = direction
            this.filtercriteria.assignment = assignment
            this.filtercriteria.assignmentcateogory = assignmentcateogory
        },
        async setgracedays(alias: string, value: number) {
            const user = this.Scores.find((user: { alias: string}) => user.alias === alias)
            if (user) {
                user.gracedays = value
                await this.updategracedaysDB(alias, value)
            }
        },
        async updategracedaysDB(alias: string, value: number) {
            try {
                const userstore = useUserStore()
                const admin = userstore.getAlias
                const token = userstore.getAuthtoken
                await this.userservice.updateUserGraceDays(token, admin, alias, value)
            } catch (error) {
                console.error('Error updating gracedays', error)
            }
        },
        setFilterCriteria(value: string) {
            this.filtercriteria.name = value
        },
        generateScoresArray() {
            this.Scores = this.Users.map(user => ({
                alias: user.alias,
                firstname: user.firstName,
                lastname: user.lastName,
                gracedays: user.graceDays,
                name: `${user.firstName} ${user.lastName}`,
                Assignments: this.Assignments.map(assignment => {
                    const userassignment = this.UserAssignments.find(
                        ua => ua.alias === user.alias && ua.assignmentid === assignment.id
                    )
                    return {
                        assignmentid: assignment.id,
                        scoreearned: userassignment ? userassignment.scoreearned : null,
                        maxscore: userassignment ? userassignment.maxscore : null,
                        gracedaysearned: userassignment ? userassignment.gracedaysearned : null,
                        gracedaysused: userassignment ? userassignment.gracedaysused : null
                    }
                })
            }))
        },
        async requestAssignments() {
            if (this.Assignments.length !== 0) return
            try {
                const userstore = useUserStore()
                const token = userstore.getAuthtoken
                this.Assignments = await this.assignmentservice.getAssignmentDetails(token)
            } catch (error) {
                console.error("Error fetching assignments", error)
            }
        },
        async requestUsers() {
            if (this.Users.length !== 0) return
            try {
                const userstore = useUserStore()
                const token = userstore.getAuthtoken
                const alias = userstore.alias
                this.Users = await this.userservice.getUserList(token, alias)
            } catch (error) {
                console.error("Error fetching users", error)
            }
        },
        async requestUserAssignments() {
            try {
                const userstore = useUserStore()
                const token = userstore.getAuthtoken
                const alias = userstore.alias
                this.UserAssignments = await this.userassignmentservice.getAllUserAssignments(token, alias)
            } catch (error) {
                console.error("Error fetching userassingments")
            }
        },
        async mountscores() {
            this.isLoading = true
            await this.requestAssignments()
            await this.requestUsers()
            await this.requestUserAssignments()
            this.generateScoresArray()
            this.isLoading = false
        },
        unmount() {
            this.Users = []
            this.Assignments = []
            this.UserAssignments = []
            this.Scores = []
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useScoresStore, import.meta.hot))
}