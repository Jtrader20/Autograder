<template>
    <teleport to="body">
        <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-secondary p-6 rounded-md w-96 text-accent">
                <input type="file" @change="handleFileChange" class="mb-4"/>
                <div class="flex justify-between">
                    <div @click="closeModal" class="bg-danger text-accent py-2 px-4 rounded-md cursor-pointer">
                        Cancel
                    </div>
                    <div @click="submit" class="bg-success text-accent py-2 px-2 rounded-md cursor-pointer">
                        Submit
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script lang="ts">
import { Files } from '@autograder/shared'
import { useGraderStore } from '../../store/grader';

export default  {
    props: {
        isVisible: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            store: useGraderStore()
        }
    },
    methods: {
        handleFileChange(event: Event) {
            const input = event.target as HTMLInputElement
            if (input.files) {
               this.store.resetFiles()
               Array.from(input.files).forEach(file => {
                const reader = new FileReader()
                console.count()
                reader.onload = () => {
                    console.table({name: file.name, content: reader.result as string, type: file.type})
                    const fileData: Files = {
                        name: file.name,
                        content: reader.result as string,
                        type: file.type
                    }

                   this.store.addFile(fileData)
                }
                reader.readAsText(file)
               })
            }
        },
        submit() {
            this.store.createSubmission()
            this.closeModal()
        },
        closeModal() {
            this.$emit('close')
        }
    }
}
</script>