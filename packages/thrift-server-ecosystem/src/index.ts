import { generate } from '@creditkarma/thrift-typescript'
import { fork } from 'child_process'

process.chdir(__dirname)

generate({
    rootDir: '.',
    outDir: 'generated',
    sourceDir: 'thrift',
    target: 'thrift-server',
    files: [],
    library: '@creditkarma/thrift-server-core',
})

const clientProc = fork('./client.ts')
const addProc = fork('./add-service.ts')
const calculatorProc = fork('./calculator-service.ts')

function exit(code: number) {
    clientProc.kill()
    addProc.kill()
    calculatorProc.kill()
    process.exitCode = code
}

process.on('SIGINT', () => {
    console.log('Caught interrupt signal')
    exit(0)
})
