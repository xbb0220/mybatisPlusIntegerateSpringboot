package com.hywa.cors.entity;

import com.baomidou.mybatisplus.activerecord.Model;
import java.io.Serializable;

/**
 * <p>
 * 菜单
 * </p>
 *
 * @author xbb
 * @since 2018-05-11
 */
public class Menu extends Model<Menu> {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    private String id;

    /**
     * 菜单文本
     */
    private String text;

    /**
     * 菜单css
     */
    private String iconCls;

    /**
     * 菜单地址
     */
    private String url;

    /**
     * 父菜单主键（外键到菜单表主键）
     */
    private String parentId;

    /**
     * 菜单位置，用于进行菜单排序
     */
    private Integer position;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
    public String getIconCls() {
        return iconCls;
    }

    public void setIconCls(String iconCls) {
        this.iconCls = iconCls;
    }
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }
    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }

    @Override
    public String toString() {
        return "Menu{" +
        "id=" + id +
        ", text=" + text +
        ", iconCls=" + iconCls +
        ", url=" + url +
        ", parentId=" + parentId +
        ", position=" + position +
        "}";
    }
}
