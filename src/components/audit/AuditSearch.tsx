import { FC } from 'react';
import { Link } from 'react-router-dom';

interface outputSearchState {
  onChange: any;
  onSubmit: any;
  itemSearch: any;
  itemClient: any;
  searchProduct: any;
  itemOutputSearch: any;
  onChangeProvider: any;
  onChangeoutputType: any;
}

const OutputSearch: FC<outputSearchState> = (props) => {
  const {
    itemSearch,
    itemClient,
    onSubmit,
    searchProduct,
    itemOutputSearch,
    onChange,
    onChangeProvider,
    onChangeoutputType
  } = props;

  const providerObjet = itemSearch.providers;
  const categoriesObjet = itemSearch.categories;
  const colorsObjet = itemSearch.colors;
  const sizesObjet = itemSearch.sizes;
  const productsObjet = searchProduct.products;
  const outputObjet = itemOutputSearch.outputType;
  const clientObjet = itemClient.clientOutput;

  return (
    <div className="row  mb-lg-3">
      <div className="col-lg-12">
        <div className="row">
          <div className="col-md-12 mb-lg-0 mb-4">
            <div className="card mt-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                  <h6 className="text-white text-capitalize ps-3">Buscador </h6>
                </div>
              </div>

              <div className="card-body p-3">
                <form onSubmit={onSubmit}>
                  <div className="row">
                    <div className="col-4 col-md-2">
                      <div className="input-group input-group-static mb-4">
                        <label htmlFor="exampleFormControlSelect1" className="ms-0">
                          Salio a
                        </label>
                        <select
                          className="form-control"
                          onChange={onChangeoutputType}
                          name="aud_output_type"
                          id="aud_output_type"
                        >
                          <option value="">Selecciones una clase</option>
                          {outputObjet &&
                            outputObjet !== null &&
                            outputObjet !== undefined &&
                            outputObjet.length !== 0 &&
                            outputObjet.map((item: any) => (
                              <>
                                <option key={item.id} value={item.ot_name}>
                                  {item.ot_name}
                                </option>
                              </>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-4 col-md-2">
                      <div className="input-group input-group-static mb-4">
                        <label htmlFor="exampleFormControlSelect1" className="ms-0">
                          Cliente
                        </label>
                        <select
                          className="form-control"
                          onChange={onChange}
                          name="aud_client"
                          id="aud_client"
                        >
                          <option value="">Selecciones una clase</option>
                          {clientObjet &&
                            clientObjet !== null &&
                            clientObjet !== undefined &&
                            clientObjet.length !== 0 &&
                            clientObjet.map((item: any) => (
                              <>
                                <option key={item.id} value={item.ci_name}>
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
                          name="aud_provider"
                          id="aud_provider"
                        >
                          <option value="">Selecciones un Proveedor</option>
                          {providerObjet &&
                            providerObjet !== null &&
                            providerObjet !== undefined &&
                            providerObjet.length !== 0 &&
                            providerObjet.map((item: any) => (
                              <>
                                <option key={item.id} value={item.pr_name}>
                                  {item.pr_name}
                                </option>
                              </>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-4 col-md-2">
                      <div className="input-group input-group-static mb-4">
                        <label htmlFor="exampleFormControlSelect1" className="ms-0">
                          Producto
                        </label>
                        <select
                          className="form-control"
                          onChange={onChange}
                          name="aud_product"
                          id="aud_product"
                        >
                          <option value="">Selecciones un Producto</option>
                          {productsObjet &&
                            productsObjet !== null &&
                            productsObjet !== undefined &&
                            productsObjet.length !== 0 &&
                            productsObjet.map((item: any) => (
                              <>
                                <option key={item.id} value={item.id}>
                                  {item.pt_name} - {item.pt_description}
                                </option>
                              </>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-4 col-md-2">
                      <div className="input-group input-group-static mb-4">
                        <label htmlFor="exampleFormControlSelect1" className="ms-0">
                          Clase
                        </label>
                        <select
                          className="form-control"
                          onChange={onChange}
                          name="aud_category"
                          id="aud_category"
                        >
                          <option value="">Selecciones una clase</option>
                          {categoriesObjet &&
                            categoriesObjet !== null &&
                            categoriesObjet !== undefined &&
                            categoriesObjet.length !== 0 &&
                            categoriesObjet.map((item: any) => (
                              <>
                                <option key={item.id} value={item.id}>
                                  {item.ct_name}
                                </option>
                              </>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-4 col-md-2">
                      <div className="input-group input-group-static mb-4">
                        <label htmlFor="exampleFormControlSelect1" className="ms-0">
                          Color
                        </label>
                        <select
                          className="form-control"
                          onChange={onChange}
                          name="aud_color"
                          id="aud_color"
                        >
                          <option value="">Selecciones un Color</option>
                          {colorsObjet &&
                            colorsObjet !== null &&
                            colorsObjet !== undefined &&
                            colorsObjet.length !== 0 &&
                            colorsObjet.map((item: any) => (
                              <>
                                <option key={item.id} value={item.id}>
                                  {item.cl_name}
                                </option>
                              </>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-4 col-md-2">
                      <div className="input-group input-group-static mb-4">
                        <label htmlFor="exampleFormControlSelect1" className="ms-0">
                          Talla
                        </label>
                        <select
                          className="form-control"
                          onChange={onChange}
                          name="aud_size"
                          id="aud_size"
                        >
                          <option value="">Selecciones una talla</option>
                          {sizesObjet &&
                            sizesObjet !== null &&
                            sizesObjet !== undefined &&
                            sizesObjet.length !== 0 &&
                            sizesObjet.map((item: any) => (
                              <>
                                <option key={item.id} value={item.id}>
                                  {item.sz_name}
                                </option>
                              </>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-4 col-md-2">
                      <div className="input-group input-group-static mb-3">
                        <label>Responsable </label>
                        <input
                          type="text"
                          name="aud_create_by"
                          id="aud_create_by"
                          onChange={onChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-4 col-md-2">
                      <div className="input-group input-group-static mb-3">
                        <label>Desde </label>
                        <input
                          type="date"
                          name="aud_since"
                          id="aud_since"
                          onChange={onChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-4 col-md-2">
                      <div className="input-group input-group-static mb-3">
                        <label>Hasta</label>
                        <input
                          type="date"
                          name="aud_until"
                          id="aud_until"
                          onChange={onChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-4 col-md-2"></div>
                    <div className="col-1 ">
                      <button className="btn bg-gradient-info " type="submit">
                        <i className="material-icons text-sm">search</i>
                        <br />
                        Buscar
                      </button>
                    </div>
                    <div className="col-1 ">
                      <Link
                        className="btn bg-gradient-success "
                        to="http://127.0.0.1:8000/audits/downlaod/"
                      >
                        <i className="material-icons text-sm">download</i>
                        <br />
                        Excel
                      </Link>
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

export default OutputSearch;
