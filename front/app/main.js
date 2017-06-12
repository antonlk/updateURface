(function () {
  'use strict';

  angular.module('app').controller('ModalBaseConfirm', ModalBaseConfirm);

  ModalBaseConfirm.$inject = [ '$modalInstance', 'ModalBaseOptions' ];
  function ModalBaseConfirm( $modalInstance, ModalBaseOptions ) {

    var vm = this;
    var defaultConfig = {
      title: 'Confirmar',
      message: '¿Está seguro de que quiere realizar la operación?',
      confirmText: 'Confirmar',
      confirmClass: 'btn-success',
      confirmIcon: 'fa fa-check',
      rejectText: 'Cancelar',
      rejectClass: 'btn-dark',
      rejectIcon: 'fa fa-undo'
    };

    vm.modal = angular.extend({}, defaultConfig, ModalBaseOptions);
    vm.confirm = function (result) {
      $modalInstance.close(result);
    };
  }

} ());