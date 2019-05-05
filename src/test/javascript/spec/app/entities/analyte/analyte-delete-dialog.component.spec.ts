/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CeTestModule } from '../../../test.module';
import { AnalyteDeleteDialogComponent } from 'app/entities/analyte/analyte-delete-dialog.component';
import { AnalyteService } from 'app/entities/analyte/analyte.service';

describe('Component Tests', () => {
    describe('Analyte Management Delete Component', () => {
        let comp: AnalyteDeleteDialogComponent;
        let fixture: ComponentFixture<AnalyteDeleteDialogComponent>;
        let service: AnalyteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CeTestModule],
                declarations: [AnalyteDeleteDialogComponent]
            })
                .overrideTemplate(AnalyteDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AnalyteDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnalyteService);
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
