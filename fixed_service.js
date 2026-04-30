"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTypesService = void 0;
const common_1 = require("@nestjs/common");
const event_types_repository_1 = require("../repositories/event-types.repository");
let EventTypesService = class EventTypesService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async list(workspaceId, filters) { return this.repo.findByWorkspace(workspaceId, filters); }
    async findById(id) { if (!id || id === "undefined") throw new common_1.NotFoundException("Event type not found.");
        const et = await this.repo.findById(id);
        if (!et)
            throw new common_1.NotFoundException('Event type not found.');
        return et;
    }
    async create(workspaceId, dto) {
        const existing = await this.repo.findBySlug(workspaceId, dto.slug);
        if (existing)
            throw new common_1.ConflictException('An event type with this slug already exists.');
        return this.repo.create({ ...dto, workspaceId });
    }
    async update(id, dto) {
        await this.findById(id);
        return this.repo.updateById(id, dto);
    }
    async duplicate(id) {
        const original = await this.findById(id);
        const data = original.toObject();
        delete data._id;
        delete data.id;
        data.name = `${data.name} (copy)`;
        data.slug = `${data.slug}-copy-${Date.now()}`;
        data.status = 'draft';
        return this.repo.create(data);
    }
    async archive(id) { return this.repo.updateById(id, { status: 'archived' }); }
    async delete(id) { return this.repo.deleteById(id); }
    async getPreview(id) {
        const et = await this.findById(id);
        return {
            id: et.id,
            title: et.name,
            summary: et.description ?? '',
            durationLabel: `${et.durationMinutes} min`,
            locations: et.locations,
            paymentLabel: et.payment?.mode === 'free' ? 'Free' : `${et.payment?.currency} ${et.payment?.amount ?? ''}`,
            approvalLabel: et.requiresApproval ? 'Requires approval' : 'Instant booking',
        };
    }
};
exports.EventTypesService = EventTypesService;
exports.EventTypesService = EventTypesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_types_repository_1.EventTypesRepository])
], EventTypesService);
//# sourceMappingURL=event-types.service.js.map
