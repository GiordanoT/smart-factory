export default class Grafana {
    static graphs = {
        'A': {
            movement: 'http://localhost:3000/d-solo/c1e6b704-503c-4855-a6d0-4bc9f61d9519/room-a?orgId=1&refresh=30s&from=1688672573680&to=1688673473680&theme=light&panelId=3',
            temperature: 'http://localhost:3000/d-solo/c1e6b704-503c-4855-a6d0-4bc9f61d9519/room-a?orgId=1&refresh=30s&from=1688672354488&to=1688673254488&theme=light&panelId=1',
            air: 'http://localhost:3000/d-solo/c1e6b704-503c-4855-a6d0-4bc9f61d9519/room-a?orgId=1&refresh=30s&from=1688672716441&to=1688673616441&theme=light&panelId=2'
        },
        'B': {
            movement: 'http://localhost:3000/d-solo/c1e6b704-503c-4855-a6d0-4bc9f61d9520/room-b?orgId=1&refresh=30s&from=1688672909547&to=1688673809547&theme=light&panelId=3',
            temperature: 'http://localhost:3000/d-solo/c1e6b704-503c-4855-a6d0-4bc9f61d9520/room-b?orgId=1&refresh=30s&from=1688673070203&to=1688673970203&theme=light&panelId=1',
            air: 'http://localhost:3000/d-solo/c1e6b704-503c-4855-a6d0-4bc9f61d9520/room-b?orgId=1&refresh=30s&from=1688672969995&to=1688673869995&theme=light&panelId=2'
        },
        'C': {
            movement: 'http://localhost:3000/d-solo/c1e6b704-503c-4855-a6d0-4bc9f61d9521/room-c?orgId=1&refresh=30s&from=1688673093514&to=1688673993514&theme=light&panelId=3',
            temperature: 'http://localhost:3000/d-solo/c1e6b704-503c-4855-a6d0-4bc9f61d9521/room-c?orgId=1&refresh=30s&from=1688673108739&to=1688674008739&theme=light&panelId=1',
            air: 'http://localhost:3000/d-solo/c1e6b704-503c-4855-a6d0-4bc9f61d9521/room-c?orgId=1&refresh=30s&from=1688673137842&to=1688674037842&theme=light&panelId=2'
        }
    }


}
