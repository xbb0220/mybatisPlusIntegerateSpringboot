package com.hywa.cors.kit.easyui;

import java.util.List;

import com.baomidou.mybatisplus.plugins.Page;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class EasyUiPage<T> extends Page<T> {
	private static final long serialVersionUID = -3850948323490712971L;
	
	public EasyUiPage() {
		super();
	}

	public EasyUiPage(int current, int size) {
        super(current, size);
    }

    public EasyUiPage(int current, int size, String orderByField) {
        super(current, size);
        this.setOrderByField(orderByField);
    }

    public EasyUiPage(int current, int size, String orderByField, boolean isAsc) {
        this(current, size, orderByField);
        this.setAsc(isAsc);
    }
	
	public void setPage(Integer page) {
		super.setCurrent(page);
	}
	
	public void setRows(Integer rows) {
		super.setSize(rows);
	}
	
	public List<?> getRows() {
		return super.getRecords();
	}

	@JsonIgnore
	@Override
	public List<T> getRecords() {
		return super.getRecords();
	}
	
}
