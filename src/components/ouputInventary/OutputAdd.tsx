import { FC } from 'react';

interface outputListState {
  itemOutputAdd: any;
  itemOutput: any;
  itemClient: any;
  searchProduct: any;
  onChange: any;
  onSubmit: any;
  onChangeProvider: any;
  onChangeoutputType: any;
}

const OutputAdd: FC<outputListState> = (props) => {
  const {
    itemOutput,
    itemClient,
    onChange,
    onSubmit,
    onChangeProvider,
    itemOutputAdd,
    onChangeoutputType,
    searchProduct
  } = props;

  const providersObjet = itemOutput.providers;
  const outputTypeObjet = itemOutput.outputType;
  const productsObjet = searchProduct.data;
  const clientObjet = itemClient.clientOutput;

  return (
    <div className="row  mb-lg-3">
      <div className="col-lg-12">
        <div className="row">
          <div className="col-md-12 mb-lg-0 mb-4">
            <div className="card mt-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                  <h6 className="text-white text-capitalize ps-3">Salidas </h6>
                </div>
              </div>

              <div className="card-body p-3">
                <form onSubmit={onSubmit}>
                  <div className="row">
                    <div className="col-3 col-md-2">
                      <div className="input-group input-group-static mb-4">
                        <label>Referencia de salidad</label>
                        <input
                          onChange={onChange}
                          type="text"
                          name="inv_order"
                          id="inv_order"
                          className="form-control"
                          placeholder="Escribe la referencia de salida"
                          disabled={
                            itemOutputAdd &&
                            itemOutputAdd !== null &&
                            itemOutputAdd !== undefined &&
                            itemOutputAdd.length
                              ? true
                              : false
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="col-2 col-md-2">
                      <div className="input-group input-group-static mb-4">
                        <label htmlFor="exampleFormControlSelect1" className="ms-0">
                          A donde sale
                        </label>
                        <select
                          className="form-control"
                          onChange={onChangeoutputType}
                          name="inv_output_type"
                          id="inv_output_type"
                          required
                        >
                          <option value="">Selecciones a donde sale</option>
                          {outputTypeObjet &&
                            outputTypeObjet !== null &&
                            outputTypeObjet !== undefined &&
                            outputTypeObjet.length !== 0 &&
                            outputTypeObjet.map((item: any) => (
                              <>
                                <option key={item.id} value={item.ot_name}>
                                  {item.ot_name}
                                </option>
                              </>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-2 col-md-2">
                      <div className="input-group input-group-static mb-4">
                        <label htmlFor="exampleFormControlSelect1" className="ms-0">
                          Cliente
                        </label>
                        <select
                          className="form-control"
                          onChange={onChange}
                          name="inv_client"
                          id="inv_client"
                          required
                        >
                          <option value="">Selecciones un Clente</option>
                          {clientObjet &&
                            clientObjet !== null &&
                            clientObjet !== undefined &&
                            clientObjet.length !== 0 &&
                            clientObjet.map((item: any) => (
                              <>
                                <option key={item.id} value={item.id}>
                                  {item.ci_name}
                                </option>
                              </>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-4 col-md-2">
                      <div className="input-group input-group-static mb-4">
                        <label htmlFor="exampleFormControlSelect1" className="ms-0">
                          Proveedor
                        </label>
                        <select
                          className="form-control"
                          onChange={onChangeProvider}
                          name="inv_provider"
                          id="inv_provider"
                          required
                        >
                          <option value="">Selecciones un Proveedor</option>
                          {providersObjet &&
                            providersObjet !== null &&
                            providersObjet !== undefined &&
                            providersObjet.length !== 0 &&
                            providersObjet.map((item: any) => (
                              <>
                                <option key={item.id} value={item.pr_name}>
                                  {item.pr_name}
                                </option>
                              </>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-6 col-md-2">
                      <div className="input-group input-group-static mb-4">
                        <label htmlFor="exampleFormControlSelect1" className="ms-0">
                          Producto
                        </label>
                        <select
                          className="form-control"
                          onChange={onChange}
                          name="inv_invetary"
                          id="inv_invetary"
                          required
                        >
                          <option value="">Selecciones un Producto</option>
                          {productsObjet &&
                            productsObjet !== null &&
                            productsObjet !== undefined &&
                            productsObjet.length !== 0 &&
                            productsObjet.map((item: any) => (
                              <>
                                <option key={item.id} value={item.id}>
                                  {item.inv_product} - {item.inv_ref} - {item.inv_color}{' '}
                                  {item.inv_size === 'NO APLICA'
                                    ? ''
                                    : ' - ' + item.inv_size}{' '}
                                  - {item.inv_category}
                                </option>
                              </>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-2 col-md-1">
                      <div className="input-group input-group-static mb-4">
                        <label>Cantidad</label>
                        <input
                          onChange={onChange}
                          type="number"
                          name="inv_cout"
                          id="inv_cout"
                          className="form-control"
                          placeholder="0"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-1">
                      <button className="btn bg-gradient-warning " type="submit">
                        <i className="material-icons text-sm">add</i>
                        <br />
                        Agregar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputAdd;
