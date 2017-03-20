/**
 * 
 */
package vn.gmobile.uniboard.data.struct;

import java.util.*;

import com.bean.base.Parametrizer;


/**
 * @author QuangN
 *
 */
public class TreeNode<T> extends Parametrizer<T> {
	T _val;
	List<TreeNode<T>> _children;
	TreeNode<T> _parent;
	
	public TreeNode(T val) {
		_val = val;
		_children =  new ArrayList<TreeNode<T>>();
	}
	

	public T getNodeVal() {
		return _val;
	}
	
	public TreeNode<T> getParent() {
		return _parent;
	}
	
	public void addChild(TreeNode<T> node) {
		if (node.getNodeVal() != _val) {
			_children.add(node);
			node._parent =  this;
		}
	}	

	public Collection<TreeNode<T>>  getDirectChild() {
		return new ArrayList<TreeNode<T>>(_children);
	}
	
	public Collection<TreeNode<T>> getAllParent() {
		Set<TreeNode<T>> parents = new HashSet<TreeNode<T>>();
		TreeNode<T> parentNode = this._parent;
		while (parentNode!=null) {
			parents.add(parentNode);
			parentNode = parentNode._parent;
		}
		return parents;
	}

	
	public Collection<TreeNode<T>> getAllChild() {
		Set<T> visited = new HashSet<T>();
		visited.add(this.getNodeVal());
		Collection<TreeNode<T>> childNodes = getAllChild(this,visited);
		return new ArrayList<TreeNode<T>>(childNodes);
	}
	
	private Collection<TreeNode<T>> getAllChild(TreeNode<T> agentNode, Set<T> visited) {
		Collection<TreeNode<T>> childs = new ArrayList <TreeNode<T>>();
		List<TreeNode<T>> newNode = new ArrayList<TreeNode<T>>();
		for(TreeNode<T> child:agentNode._children) {
			if (!visited.contains(child.getNodeVal())) {
				childs.add(child);
				visited.add(child.getNodeVal());
				newNode.add(child);
			}
		}
		for(TreeNode<T> child:newNode) {
			childs.addAll(child.getAllChild(child,visited));
		}
		return childs;
	}
}
