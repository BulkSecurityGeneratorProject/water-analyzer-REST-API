/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CeTestModule } from '../../../test.module';
import { MatrixListDeleteDialogComponent } from 'app/entities/matrix-list/matrix-list-delete-dialog.component';
import { MatrixListService } from 'app/entities/matrix-list/matrix-list.service';

describe('Component Tests', () => {
    describe('MatrixList Management Delete Component', () => {
        let comp: MatrixListDeleteDialogComponent;
        let fixture: ComponentFixture<MatrixListDeleteDialogComponent>;
        let service: MatrixListService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CeTestModule],
                declarations: [MatrixListDeleteDialogComponent]
            })
                .overrideTemplate(MatrixListDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MatrixListDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MatrixListService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
