import { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  inventaryListAction,
  searchListAction,
  searchProcutAction
} from '../../redux/actions/inventaryAction';

import InventaryTable from '../../components/inventary/InventaryTable';
import Paginator from '../../components/inventary/Paginator';
import Search from '../../components/inventary/Search';
import Layout from '../../hocs/Layout';

const tableHead = [
  'Clase',
  'Proveedor',
  'Color',
  'cod. Color',
  'Insomo',
  'Referencia',
  'Saldo',
  'U.M',
  'Talla',
  'C. unidad',
  'C. total',
  'Fecha'
];

interface searchListState {
  data: any;
  searchListAction(): void;
  searchProcutAction(product: string): void;
  inventaryListAction(
    inv_category: string,
    inv_provider: string,
    inv_color: string,
    inv_product: string,
    inv_size: string,
    inv_since: string,
    inv_until: string
  ): void;
  search: any;
  search_product: any;
}

const Inventary: FC<searchListState> = (props) => {
  const {
    data,
    searchListAction,
    search,
    searchProcutAction,
    search_product,
    inventaryListAction
  } = props;
  const [inv_provider, setProvider] = useState('' as string);

  useEffect(() => {
    window.scrollTo();
    searchListAction();
    inventaryListAction(
      inv_category,
      inv_provider,
      inv_color,
      inv_product,
      inv_size,
      inv_since,
      inv_until
    );
  }, [searchListAction, inventaryListAction]);

  const [formData, setFormData] = useState({
    inv_category: null,
    inv_provider: null,
    inv_color: null,
    inv_product: null,
    inv_size: null,
    inv_since: null,
    inv_until: null
  } as object);

  const { inv_category, inv_color, inv_product, inv_size, inv_since, inv_until }: any =
    formData;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeProviver = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    searchProcutAction(e.target.value);
    if (!e.target.value) {
      setFormData({ inv_product: null });
    }

    setProvider(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e);

    e.preventDefault();
    inventaryListAction(
      inv_category,
      inv_provider,
      inv_color,
      inv_product,
      inv_size,
      inv_since,
      inv_until
    );
  };

  return (
    <Layout>
      <div className="row">
        <Search
          itemSearch={search}
          itemProdcut={inv_provider}
          onChange={handleChange}
          onSubmit={handleOnSubmit}
          searchProduct={search_product}
          onChangeProvider={handleChangeProviver}
        />
        <div className="col-12">
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">Inventario</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      {tableHead.map((item) => (
                        <>
                          <th className="text-uppercase  text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            <div className="d-flex px-2 py-1">
                              <p className="text-xs   ml-1">{item}</p>
                            </div>
                          </th>
                        </>
                      ))}
                    </tr>
                  </thead>
                  <InventaryTable items={data} />
                  <tfoot>
                    <Paginator />
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: any) => ({
  data: state.inventaryReducer.data,
  search: state.inventaryReducer.search,
  search_product: state.inventaryReducer.product
});

export default connect(mapStateToProps, {
  searchListAction,
  searchProcutAction,
  inventaryListAction
})(Inventary);
